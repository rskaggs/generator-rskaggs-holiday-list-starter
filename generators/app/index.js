'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome! This generator will help you create a starter holiday list using parcel`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'registryUserName',
        message: 'What is your npm registry username?',
        default: ``
      },
      {
        type: 'input',
        name: 'registryPackageName',
        message: 'What is your Package Name?',
        default: this.appname.replace(/\s+/g, '-').toLowerCase()
      },
      {
        type: 'input',
        name: 'registryPackageDesc',
        message: 'Package Description?',
        default: `My awesome holiday list!`
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'What is your name?',
        default: ``
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    const packageDependencies = {
      "date-holidays": "^1.4.12",
      "moment": "^2.24.0",
      "parcel": "^1.12.4",
      "styled-components": "^4.4.1"
    }
    
    const packageDevDependencies = {
      "@babel/core": "^7.7.7",
      "@babel/plugin-transform-object-assign": "^7.7.4",
      "@babel/preset-env": "^7.7.7",
      "@babel/preset-react": "^7.7.4",
      "babel-plugin-preval": "^4.0.0",
      "react": "^16.12.0",
      "react-dom": "^16.12.0"
    }
    
    
    const packageFile = {
        "name": `@${this.props.registryUserName}/${this.props.registryPackageName}`,
        "version": "0.0.1",
        "description": this.props.registryPackageDesc,
        "main": "app.js",
        "scripts": {
          "start": "parcel index.html -d ./.live",
          "generate": "parcel build index.html -d ./output"
        },
        "author": `${this.props.authorName}`,
        "license": "ISC",
        "dependencies": packageDependencies,
        "devDependencies": packageDevDependencies
    };

    this.fs.extendJSON(this.destinationPath('package.json'), packageFile);

    this.fs.copy(
      this.templatePath('./components'),
      this.destinationPath('./components')
    );

    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath('app.js')
    );

    this.fs.copy(
      this.templatePath('babelrc.config'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('index.html'),
      this.destinationPath('index.html')
    );

  }

  install() {
    this.installDependencies({bower: false});
  }
};
