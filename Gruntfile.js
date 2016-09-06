require('es6-promise').polyfill();

module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');


   
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

     
        concat: {
           
            vendor: {
                src: [
                    'bower_components/what-input/what-input.js',
                    'bower_components/jquery/dist/jquery.js',                   
                    'bower_components/foundation-sites/dist/foundation.js',             
       
                ],
                dest: 'src/js/build/vendor.js',
            },
            main: {
                src: [
                    'src/js/main.js'  
                ],
                dest: 'src/js/build/main.js',
            }
        },

       ]
        uglify: {
            vendor: {
                src: 'src/js/build/vendor.js',     
                dest: 'dist/js/vendor.min.js'  
            },
            main: {
                src: 'src/js/build/main.js',      
                dest: 'dist/js/main.min.js'  
            },
         
            modernizr: {
                src: 'bower_components/modernizr/modernizr.js',      
                dest: 'dist/js/modernizr.min.js'  
            }
        },

  
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',         
                    src: ['**/*.{png,jpg,gif}'],    
                    dest: 'dist/img/'      
                }]
            }
        },



        sass: {
            dist: {
                options: {                      
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




        
        watch: {
            // options: {
            //     livereload: true,   //refresh the browser on change
            // },
            //  watch for JS changes
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify,'],
                options: {
                    spawn: false,                   
                    livereload: true
                },
            } ,
           
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