define(function (require) {
  // we need to load the css ourselves
  require('plugins/icon_vis/icon_vis.less');

  // we also need to load the controller and used by the template
  require('plugins/icon_vis/icon_vis_controller');

  // register the provider with the visTypes registry
  require('ui/registry/vis_types').register(IconVisProvider);

  function IconVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'Icon metric',
      title: 'Icon Metric',
      description: 'One big number for all of your one big number needs. Perfect for showing ' +
        'a count of hits, or the exact average a numeric field.',
      icon: 'fa-calculator',
      template: require('plugins/icon_vis/icon_vis.html'),
      params: {
        defaults: {
          fontSize: 20,
          countSize: 12,
          animationSpeed: 3000,
          countBackground: '#00b3ee',
          iconType: 'fa-female',
          countColour: '#fff',
          enableAnimation: true,
          iconSize: 84,
        },
        editor: require('plugins/icon_vis/icon_vis_params.html')
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }
      ])
    });
  }

  // export the provider so that the visType can be required with Private()
  return IconVisProvider;
});
