require('dotenv').config();

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const chalk = require('chalk');
const { getData } = require('./getData');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/presentations',
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Docs API.
  authorize(JSON.parse(content), createReport);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function createReport(auth) {
  // Pull in CLI argument (first arg) for hostname
  let hostnameInput = process.argv.slice(2, 3)[0];

  let exportToPDF = process.argv.slice(3, 4)[0] === '-pdf';
  console.log(
    exportToPDF
      ? 'Generating report for command line and exporting to PDF.'
      : 'Generating report for command line only.'
  );

  // Start the timer
  const timingLabel = 'Total time';
  console.time(chalk.yellow.bold(timingLabel));

  // Collect the data from the back, back end
  const siteData = await getData(hostnameInput);

  const date = new Date();
  const reportDate = `${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()}`;

  const drive = google.drive({ version: 'v3', auth });
  const docs = google.docs({ version: 'v1', auth });
  const slides = google.slides({ version: 'v1', auth });
  let hostname = siteData.hostname;
  let parsedHostname = hostname.split('.').filter(str => str !== '.');
  let copyTitle = `Anchor Float Report - [${parsedHostname[1] +
    '.' +
    parsedHostname[2]}]`;
  let driveRequest = {
    name: copyTitle,
  };

  let requests = [
    {
      replaceAllText: {
        containsText: {
          text: '{{hostname}}',
          matchCase: true,
        },
        replaceText: siteData.hostname,
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{date}}',
          matchCase: true,
        },
        replaceText: reportDate,
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{pageCount}}',
          matchCase: true,
        },
        replaceText: String(siteData.pageCount),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{totalWordCount}}',
          matchCase: true,
        },
        replaceText: String(siteData.totalWordCount),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{averageWordCount}}',
          matchCase: true,
        },
        replaceText: String(siteData.averageWordCount),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{totalLinks}}',
          matchCase: true,
        },
        replaceText: String(siteData.totalLinks),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{affiliateLinks}}',
          matchCase: true,
        },
        replaceText: String(siteData.affiliateLinks),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{availableProducts}}',
          matchCase: true,
        },
        replaceText: String(siteData.availableProducts),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{thirdPartyProducts}}',
          matchCase: true,
        },
        replaceText: String(siteData.thirdPartyProducts),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{unavailableProducts}}',
          matchCase: true,
        },
        replaceText: String(siteData.unavailableProducts),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{percentAffiliatized}}',
          matchCase: true,
        },
        replaceText: String(siteData.percentAffiliatized),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{percentAvailable}}',
          matchCase: true,
        },
        replaceText: String(siteData.percentAvailable),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{percentThirdParty}}',
          matchCase: true,
        },
        replaceText: String(siteData.percentThirdParty),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{percentUnavailable}}',
          matchCase: true,
        },
        replaceText: String(siteData.percentUnavailable),
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{year}}',
          matchCase: true,
        },
        replaceText: String(date.getFullYear()),
      },
    },
  ];

  if (exportToPDF)
    try {
      console.log('Duplicating the document template...');
      const copiedFile = await drive.files.copy({
        fileId: '1LG-IfGWzhnj2xHaCC5eMElboHeOktD64AyvfxI985d4',
        resource: driveRequest,
      });
      console.log(
        `New document created: ${chalk.bold.blue(copiedFile.data.name)}`
      );

      try {
        console.log('Adding site data to new document...');
        await slides.presentations.batchUpdate({
          presentationId: copiedFile.data.id,
          resource: {
            requests,
          },
        });
        console.log(
          chalk.green.bold('Success! ') +
            `The data has been added to the report.`
        );
        try {
          console.log('\nBeginning export of report...');
          let dest = fs.createWriteStream(
            process.cwd() + `/${copiedFile.data.name}.pdf`
          );
          await drive.files.export(
            {
              fileId: copiedFile.data.id,
              mimeType: 'application/pdf',
            },
            {
              responseType: 'stream',
            },
            (err, res) => {
              if (err) return err;
              res.data
                .on('error', err => {
                  console.error(err);
                })
                .pipe(dest);
            }
          );
          console.log(
            chalk.green.bold('Success! ') +
              `A PDF report for ${chalk.blue.bold(
                hostname
              )} has been created.\n`
          );

          // Delete the document
          try {
            drive.files.delete({
              fileId: copiedFile.data.id,
            });
          } catch (err) {
            console.log('Could not delete due to error', err);
          }

          // Stop the timer
          console.timeEnd(chalk.yellow.bold(timingLabel));
          console.log();
        } catch (err) {
          console.log('Error during download', err);
        }
      } catch (err) {
        console.log('The API returned an error: ' + err);
      }
    } catch (err) {
      if (err) return console.log('The API returned an error: ' + err);
    }
}
