/*
 * Copyright (c) 2023 DevRev, Inc. All rights reserved.
 */

/*import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { FunctionFactoryType } from './function-factory';
import { testRunner } from './test-runner/test-runner';

(async () => {
  const argv = await yargs(hideBin(process.argv)).options({
    fixturePath: {
      type: 'string',
      require: true,
    },
    functionName: {
      type: 'string',
      require: true,
    },
  }).argv;

  if (!argv.fixturePath || !argv.functionName) {
    console.error(
      'Please make sure you have passed fixturePath & functionName'
    );
  }

  await testRunner({
    fixturePath: argv.fixturePath,
    functionName: argv.functionName as FunctionFactoryType,
  });
})();*/



import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL_ID;

// Interface for the response from Slack API
interface SlackResponse {
  ok: boolean;
  error?: string;
}

// Function to send a message to Slack
export const sendSlackMessage = async (message: string) => {  // Add `export` here
  try {
    const response = await axios.post<SlackResponse>(
      'https://slack.com/api/chat.postMessage',
      {
        channel: slackChannel,
        text: message,
      },
      {
        headers: {
          Authorization: `Bearer ${slackToken}`,
        },
      }
    );
    if (response.data.ok) {
      console.log('Message sent to Slack!');
    } else {
      console.error('Failed to send message:', response.data.error);
    }
  } catch (error) {
    console.error('Error sending message to Slack:', error);
  }
};

const generateSprintSummary = () => {
  const summary = `
  Sprint Summary:

  What went well:
  - Completed all tasks within the sprint.
  - Team collaboration was excellent.

  What went wrong:
  - Blockers with third-party integrations delayed progress.

  Retrospective Insights:
  - Improve communication around blockers.
  - Start sprint planning earlier.

  Cheers! The DevRev team.
  `;

  return summary;
};

const main = async () => {
  const sprintSummary = generateSprintSummary();
  await sendSlackMessage(sprintSummary);
};

main();