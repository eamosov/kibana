define(function (require) {
  return function AggTypeMetricSumProvider(Private) {
    var MetricAggType = Private(require('ui/agg_types/metrics/MetricAggType'));
    var stringEditor = require('ui/agg_types/controls/string.html');

    return new MetricAggType({
      name: 'sum',
      title: 'Sum',
      makeLabel: function (aggConfig) {
        return aggConfig.params.label === '' ? 'Sum of ' + aggConfig.params.field.displayName : aggConfig.params.label;
      },
      params: [
        {
          name: 'field',
          filterFieldTypes: 'number'
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
