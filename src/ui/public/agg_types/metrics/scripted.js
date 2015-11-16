define(function (require) {
  return function AggTypeMetricScriptedProvider(Private) {
    var _ = require('lodash');
    var MetricAggType = Private(require('ui/agg_types/metrics/MetricAggType'));
    var fieldFormats = Private(require('ui/registry/field_formats'));
    var stringEditor = require('ui/agg_types/controls/string.html');

    return new MetricAggType({
      name: 'scripted',
      title: 'Scripted',
      hasNoDsl: true,

      params: [
        {
          name: 'label',
          default: 'Scripted',
          editor: stringEditor

        },
        {
          name: 'value',
          default: 'bucket.doc_count',
          editor: stringEditor
        }
      ],

      makeLabel: function (agg) {
        return agg.params.label;
      },
      getFormat: function () {
        return fieldFormats.getDefaultInstance('number');
      },
      getValue: function (agg, bucket) {
        return eval(agg.params.value);
      }
    });
  };
});
