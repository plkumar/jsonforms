import '@jsonforms/test';
import test from 'ava';
import { JsonFormsElement } from '@jsonforms/webcomponent';
import { fakeLayoutTester, FakeLayout } from '@jsonforms/test';
import { applyMiddleware, createStore } from 'redux';
import { jsonformsReducer } from '@jsonforms/core';
import { i18nReducer } from '../src/reducers';
import thunk from 'redux-thunk';

test.beforeEach(t => {
  t.context.data = { name: 'foo' };
  t.context.schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      }
    }
  };
  t.context.uischema = {
    type: 'Control',
    scope: '#/properties/name'
  };
  t.context.translations = {
    'en-US': {
      name: 'foo'
    },
    'de-DE': {
      name: 'bar'
    }
  };
  t.context.locale = 'de-DE';
});

test.cb('render with data and translation object', t => {
  t.plan(4);
  const jsonForms = new JsonFormsElement();
  jsonForms.store = createStore(
    jsonformsReducer({ i18n: i18nReducer }),
    {
      jsonforms: {
        common: {
          data: t.context.data,
          schema: t.context.schema
        },
        i18n: {
          translations: t.context.translations,
          locale: t.context.locale
        },
        renderers: [{ tester: fakeLayoutTester, renderer: FakeLayout }]
      }
    },
    applyMiddleware(thunk)
  );

  setTimeout(
    () => {
      jsonForms.connectedCallback();
      t.is(jsonForms.children.length, 1);
      t.is(jsonForms.children.item(0).className, 'layout');
      t.deepEqual(jsonForms.store.getState().jsonforms.i18n.translations, t.context.translations);
      t.is(jsonForms.store.getState().jsonforms.i18n.locale, t.context.locale);
      t.end();
    },
    100
  );
});

test.cb('render with data,translation object and locale value', t => {
  t.plan(4);
  const jsonForms = new JsonFormsElement();
  jsonForms.store = createStore(
    jsonformsReducer({ i18n: i18nReducer }),
    {
      jsonforms: {
        common: {
          data: t.context.data,
        },
        i18n: {
          translations: t.context.translations,
          locale: t.context.locale
        },
        renderers: [{ tester: fakeLayoutTester, renderer: FakeLayout }]
      }
    },
    applyMiddleware(thunk)
  );

  setTimeout(
    () => {
      jsonForms.connectedCallback();
      t.is(jsonForms.children.length, 1);
      t.is(jsonForms.children.item(0).className, 'layout');
      t.deepEqual(jsonForms.store.getState().jsonforms.i18n.translations, t.context.translations);
      t.is(jsonForms.store.getState().jsonforms.i18n.locale, t.context.locale);
      t.end();
    },
    100
  );
});
