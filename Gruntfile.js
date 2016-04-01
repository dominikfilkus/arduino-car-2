module.exports = function(grunt) {
    grunt.initConfig({
        publicPath: 'public',

        sass: {
            dist: {
                options: {
                    compress: false,
                    sourcemap: 'none',
                    noCache: true,
                    require: 'susy'
                },
                files: [{
                    expand: true,
                    cwd: '<%= publicPath %>/styles/scss',
                    src: ['*.scss'],
                    dest: '<%= publicPath %>/styles',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass']);
};