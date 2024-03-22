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

async function getFileData(url) {
	const poller = await client.beginAnalyzeDocumentFromUrl(
		"prebuilt-document",
		url
	);

	const { pages, tables, styles, keyValuePairs, entities, documents } =
		await poller.pollUntilDone();

	/* if (pages.length <= 0) {
		console.log("No pages were extracted from the document.");
	} else {
		console.log("Pages:");
		for (const page of pages) {
			console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
			console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
			console.log(
				`  ${page.lines.length} lines, ${page.words.length} words`
			);
		}
	} */

	const allData = {
		pages: pages,
		tables: tables,
		styles: styles,
		keyValuePairs: keyValuePairs,
		entities: entities,
		documents: documents
	}

	return allData;
}


app.post('/analyzedoc', function (req, res) {
	//console.log(req.body);
	var allData =  getFileData(req.body.url);
	console.log(allData);
	res.json(allData);
  })
  
  app.listen(3000, function () {
	console.log('Server listening on port 3000!')
  })
