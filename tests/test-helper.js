import Application from 'phorest-techtest-aoifehannigan/app';
import config from 'phorest-techtest-aoifehannigan/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
