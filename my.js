'use strict';

var img = require('terminal-image');
var got = require('got');
var c = require('chalk');
var ww = require('word-wrap');
var link = require('terminal-link');
var iq = require('inquirer');

const avatarUrl =
  'https://avatars3.githubusercontent.com/u/19576688?s=600&u=d7938daf306329c0f6837b736f749210b4cf796e&v=4';

got(avatarUrl, { responseType: 'buffer' })
  .then(function (image) {
    return img.buffer(image.body, { width: '50%' });
  })
  .then(function (image) {
    console.log(image);

    console.log(
      ww(
        `Hello, my name is ${c.blue.bold('Serhan Ertürk')}!
        I living in ${c.red.bold('Istanbul, Turkey')}
        I working for ${link(c.green.bold('MOBVEN'), 'https://www.mobven.com')}
        My Github Profile ${link(
          c.yellow.bold('GITHUB'),
          'https://github.com/srnerturk'
        )}
        `.trim(),
        { width: 200, trim: true }
      )
    );
    console.log('\n\n');
    iq.prompt([
      {
        type: 'list',
        message: 'how can you find me?',
        name: 'open',
        choices: [
          {
            name: c.gray(`✊ My Github Profile (${c.bold('GitHub')})`),
            value: 'https://github.com/f',
          },
          {
            name: c.blue(`✊ My Linkedin Profile (${c.bold('LinkedIn')})`),
            value: 'https://www.linkedin.com/in/serhan-erturk-990257123/',
          },
          { name: c.red('Exit.\n'), value: false },
        ],
      },
    ])
      .then(function (a) {
        opn(a.open);
        process.exit();
      })
      .catch(function () {});
  })
  .catch(function (e) {
    console.log(e);
  });
