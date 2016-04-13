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
                files: {
                    '<%= publicPath %>/styles/styles.css' : '<%= publicPath %>/styles/scss/styles.scss'

                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass']);
};