module.exports = (grunt) => {
    var tasks = {
        scope: ['devDependencies', 'dependencies']
    };
    var options = {
        config: {
            src: "grunt/*.js"
        }
    };
    var configs = require('load-grunt-configs')(grunt, options);
    require('load-grunt-tasks')(grunt, tasks);
    grunt.initConfig(configs);

    //XML replacement tasks
    grunt.registerTask('replace:all', [
        'xmlstoke:masterDatasources',
        'xmlstoke:registry',
        'xmlstoke:carbon'
    ]);

    grunt.registerTask('replace:am', [
        'xmlstoke:metricsDataSources'
    ]);

    grunt.registerTask('replace:esb', [
        'xmlstoke:axis2hl7'
    ]);

    grunt.registerTask('replace:greg', [
        'xmlstoke:metricsDataSources',
        'xmlstoke:bpsDataSources',
        'xmlstoke:socialDataSources'
    ]);

    grunt.registerTask('replace:is', [
        'xmlstoke:metricsDataSources',
        'xmlstoke:bpsDataSources',
        'copy:ssoIdpConfig'
    ]);

    //Dynamic Build Task
    grunt.registerTask('build', 'Dynamic build task i.e build:env:esb', (env, app) => {
        //Set global for application type
        global['wso2app'] = app;
        global['serviceProviderId'] = `service-provider-${app}`;
        //Arbitrarily order sso by ports so they don't overwrite each other in sso-idp-config
        global['ssoSlot'] = global[`${app}PortOffset`] + 1;
        console.log('ssoSlot', ssoSlot);

        global['portOffset'] = global[`${app}PortOffset`];
        global['carbonConnectionString'] = global[`${app}CarbonConnectionString`];
        global['carbonUsername'] = global[`${app}CarbonUsername`];
        global['carbonPassword'] = global[`${app}CarbonPassword`];

        grunt.task.run(`copy:${app}`);
        grunt.task.run('replace:all');

        if(app === 'esb'){
            grunt.task.run('replace:esb');
        }

        if(app === 'am'){
            global['metricsConnectionString'] = global['amMetricsConnectionString'];
            global['metricsUsername'] = global['amMetricsUsername'];
            global['metricsPassword'] = global['amMetricsPassword'];
            grunt.task.run('replace:am');
        }

        if(app === 'greg'){
            global['metricsConnectionString'] = global['gregMetricsConnectionString'];
            global['metricsUsername'] = global['gregMetricsUsername'];
            global['metricsPassword'] = global['gregMetricsPassword'];
            global['bpsConnectionString'] = global['gregBpsConnectionString'];
            global['bpsUsername'] = global['gregBpsUsername'];
            global['bpsPassword'] = global['gregBpsPassword'];
            grunt.task.run('replace:greg');
        }

        if(app === 'is'){
            global['metricsConnectionString'] = global['isMetricsConnectionString'];
            global['metricsUsername'] = global['isMetricsUsername'];
            global['metricsPassword'] = global['isMetricsPassword'];
            global['bpsConnectionString'] = global['isBpsConnectionString'];
            global['bpsUsername'] = global['isBpsUsername'];
            global['bpsPassword'] = global['isBpsPassword'];
            grunt.task.run('replace:is');
        }

        if(app !== 'am'){
            grunt.task.run('xmlstoke:removeUnnecessaryConnections');
        }

        if(app !== 'is'){
            grunt.task.run(
                'xmlstoke:authenticators',
                'xmlstoke:ssoIdpConfig'
            );
        }
    });

    //Main function i.e grunt buildAll:local, grunt buildAll:prod
    grunt.registerTask('buildAll', (env) => {
        let globals = grunt.file.readJSON(`replacements/${env}.json`);

        global['env'] = env;
        //Set globals based on json config file
        for (var [key, value] of Object.entries(globals)) {
            global[key] = value;
        }

        grunt.task.run(
            `clean:${env}`,
            `build:${env}:esb`,
            `build:${env}:brs`,
            `build:${env}:am`,
            `build:${env}:greg`,
            `build:${env}:dss`,
            `build:${env}:is`
        );
    });
}
