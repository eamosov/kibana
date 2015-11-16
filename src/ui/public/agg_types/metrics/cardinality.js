define(function (require) {
  return function AggTypeMetricCardinalityProvider(Private) {
    var _ = require('lodash');
    var MetricAggType = Private(require('ui/agg_types/metrics/MetricAggType'));
    var fieldFormats = Private(require('ui/registry/field_formats'));
    var stringEditor = require('ui/agg_types/controls/string.html');

    return new MetricAggType({
      name: 'cardinality',
      title: 'Unique Count',
      makeLabel: function (aggConfig) {
        return aggConfig.params.label === '' ? 'Unique count of ' + aggConfig.params.field.displayName  : aggConfig.params.label;
      },
      getFormat: function () {
        return fieldFormats.getDefaultInstance('number');
      },
      params: [
        {
          name: 'field'
        },
        {
          name: 'label',
          default: '',
          editor: stringEditor,
          write: _.noop
        },
        {
          name: 'value',
          default: 'bucket[agg.id].value',
          editor: stringEditor,
          write: _.noop
        }
      ],
      getValue: function (agg, bucket) {
        return agg.params.value === '' ? bucket[agg.id].value : eval(agg.params.value);
      }
    });
  };
});
