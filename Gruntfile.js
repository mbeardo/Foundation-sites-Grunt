require('es6-promise').polyfill();

module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //  All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //  Concatinate all JS files
        concat: {
            //  Configuration for concatinating files goes here.
            vendor: {
                src: [
                    'bower_components/what-input/what-input.js',
                    'bower_components/jquery/dist/jquery.js',                   // Import jQuery
                    'bower_components/foundation-sites/dist/foundation.js',             //Import Foundation JS
       
                ],
                dest: 'src/js/build/vendor.js',
            },
            main: {
                src: [
                    'src/js/main.js'  // This specific file
                ],
                dest: 'src/js/build/main.js',
            }
        },

        //  Minify all JS files
        uglify: {
            vendor: {
                src: 'src/js/build/vendor.js',      //change this...
                dest: 'dist/js/vendor.min.js'  //...to this minified version
            },
            main: {
                src: 'src/js/build/main.js',      //change this...
                dest: 'dist/js/main.min.js'  //...to this minified version
            },
            //modernizr is separate as is called in the <head>
            modernizr: {
                src: 'bower_components/modernizr/modernizr.js',      //change this...
                dest: 'dist/js/modernizr.min.js'  //...to this minified version
            }
        },

        //  Optimise all PNG/JPG/GIF images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',         //image directory
                    src: ['**/*.{png,jpg,gif}'],    //these filetypes
                    dest: 'dist/img/'      //destination for optimised images
                }]
            }
        },



        sass: {
            dist: {
                options: {                       // Target options
                    style: 'compressed'
                    },
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },


        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'dist/css/*.css'
            }
        },




        // Watch for specific file changes
        watch: {
            // options: {
            //     livereload: true,   //refresh the browser on change
            // },
            //  watch for JS changes
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify,'],
                options: {
                    spawn: false,                   //what even is this?!?!
                    livereload: true
                },
            } ,
            //  watch for SCSS changes
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            //  watch for HTML changes
            html: {
                files: ['**/*.html'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
            // livereload: {
            //     options: { livereload: true },
            //     files: ['*/*'],
            // },



        }

    });


    grunt.registerTask('default', ['concat' , 'uglify' , 'imagemin'  , 'sass' , 'postcss:dist']);

};