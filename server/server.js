const {
	AzureKeyCredential,
	DocumentAnalysisClient,
} = require("@azure/ai-form-recognizer");

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, Content-Length, X-Requested-With"
	);
	next();
});

// set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
const key = process.env.docIntkey;
const endpoint = process.env.docIntEndpoint;

// sample document
const formUrl =
	"https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf";

const client = new DocumentAnalysisClient(
	endpoint,
	new AzureKeyCredential(key)
);

let stringPages = "";
let stringLanguages = "";
let stringTables = "";
let stringStyles = "";
let stringKeyValue = "";
let stringDocuments = "";

async function getFileData(file) {
	const poller = await client.beginAnalyzeDocumentFromUrl(
		"prebuilt-idDocument",
		file
	);

	const {
		pages,
		tables,
		styles,
		keyValuePairs,
		documents,
		languages,
		content
	} = await poller.pollUntilDone();
	
	// pagine
	if (!pages || pages.length <= 0) {
		stringPages += "Nessuna pagina estratta dal documento.";
	} else {
		stringPages += "Pagine:\n";
		for (const page of pages) {
			stringPages +=
				"- Pagina" + page.pageNumber + `(unit: ${page.unit}), `;
			stringPages += `  ${page.width}x${page.height}, angle: ${page.angle}, `;
			stringPages += ` ${page.lines && page.lines.length} lines, ${
				page.words && page.words.length
			} words`;

			if (page.lines && page.lines.length > 0) {
				stringPages += "  Lines:\n";

				for (const line of page.lines) {
					stringPages += `  - "${line.content}"`;
				}
			}
		}
		stringPages += "\n\n";
	}

	// lingue
	if (!languages || languages.length <= 0) {
		stringLanguages += "Nessun linguaggio estratto dal documento.";
	} else {
		stringLanguages += "Lingue:\n";
		for (const languageEntry of languages) {
			stringLanguages +=
				`- Lingua trovata: ${languageEntry.locale} (confidenza: ${languageEntry.confidence})`;

			for (const text of getTextOfSpans(content, languageEntry.spans)) {
				const escapedText = text
					.replace(/\r?\n/g, "\\n")
					.replace(/"/g, '\\"');
					stringLanguages +=`  - "${escapedText}"`;
			}
		}
	}

	// tables
	if(!tables || tables.length <= 0 ) {
		stringTables += "Nessuna Tabella individuata nel Documento.\n";
	} else {
		stringTables += "Documenti: \n";
		for (const table of tables || []) {
			stringTables += `- Table (${table.columnCount}x${table.rowCount})`;
			for (const cell of table.cells) {
			  stringTables += `  cell [${cell.rowIndex},${cell.columnIndex}] "${cell.content}"`;
			}
		  }
	}

	// documents 
	if(!documents || documents.length <= 0 ) {
		stringDocuments += "Nessun Documento individuato nel file.\n";
	} else {
		stringDocuments += "Documenti: \n";
		for (const document of documents || []) {
			stringDocuments += `Tipo: ${document.docType}`;
			stringDocuments += "Campi:\n";
			for (const [name, field] of Object.entries(document.fields)) {
			  stringDocuments +=
				`Il campo ${name} ha valore '${field.value}' con un confidence score di ${field.confidence}`
			  ;
			}
		  }
	}	

	// key value
	if (!keyValuePairs || keyValuePairs.length <= 0) {
		stringKeyValue += "Nessuna coppia key-value estratta dal documento.";
	  } else {
		stringKeyValue +="Key-Value Pairs:\n";
		for (const { key, value, confidence } of keyValuePairs) {
			stringKeyValue +="- Key  : " + `"${key.content}"`;
			stringKeyValue +="  Value: " + `"${value?.content ?? "<undefined>"}" (${confidence})`;
		}
	  }

	let allData = {
		pages: stringPages,
		languages: stringLanguages,
		tables: stringTables,
		styles: styles.toString(),
		keyValuePairs: stringKeyValue,
		documents: stringDocuments,
	};

	return allData;
}

app.post("/analyzedoc", function (req, res) {
	//console.log(req.body);
	return getFileData(req.body.url).then((data) => {
		
		res.json(data);
	});
});

app.listen(3000, function () {
	console.log("Server listening on port 3000!");
});
