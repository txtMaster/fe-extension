const {mappedPluginClassNames: classNames} = await src("/app/plugins/mappedPluginClassNames.js");

const pluginClasses = await srcAll(...classNames.map(name=>"/app/plugins/"+name+".js"));

export const mappedPluginClasses = Object.fromEntries(
	classNames.map((className, index) => [className, pluginClasses[index][className]]),
);
