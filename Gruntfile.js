'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    clean: {
      build: [
        'build/css',
        'build/img',
        'build/js',
        'build/font'
      ]
    },

    copy: {
      img: {
        expand: true,
        cwd: 'src/img/',
        src: ['**/*.{png,jpg,gif,svg}'],
        dest: 'build/img/'
      },
      fonts: {
        expand: true,
        cwd: 'src/font/',
        src: ['*.{eot,svg,woff,woff2,ttf}'],
        dest: 'build/font/'
      },
      html: {
        expand: true,
        cwd: 'src/',
        src: ['*.html'],
        dest: 'build/'
      }
    },

    sass: {
      dist: {
        options: {
          sourcemap: 'inline',
          style: 'expanded'
        },
        files: {
          'build/css/style.css': 'src/sass/style.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 15 versions', 'ie 9', 'ie 10'],
        map: true
      },
      style: {
        src: 'build/css/style.css'
      }
    },

    csscomb: {
      style: {
        options: {
          config: '.csscomb.json'
        },
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    cmq: {
      options: {
        log: false
      },
      your_target: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },

    concat: {
      dist: {
        src: ['src/js/*.js'],
        dest: 'build/js/script.js'
      }
    },

    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['build/js/script.js']
        }
      }
    },

    imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['build/img/*.{png,jpg,gif,svg}']
        }]
      }
    },

    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        },
        {
          removeUselessStrokeAndFill: false
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: '{,*/}*.svg',
          dest: 'src/img'
        }]
      }
    },

    watch: {
      style: {
        files: ['src/sass/**/*.scss'],
        tasks: ['style'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['js'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      images: {
        files: ['src/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['img'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'build/css/*.css',
            'build/js/*.js',
            'build/fonts/**',
            'build/img/**/*.{png,jpg,gif,svg}',
            'build/**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: 'build/'
          },
          startPath: '/index.html',
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }
  });

  grunt.registerTask('default', [
    'clean',
    'copy',
    'sass',
    'cmq',
    'autoprefixer',
    'csscomb',
    'cssmin',
    'concat',
    'uglify',
    'imagemin',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'cmq',
    'autoprefixer',
    'csscomb',
    'cssmin',
    'concat',
    'uglify',
    'imagemin',
  ]);

  grunt.registerTask('style', [
    'sass',
    'cmq',
    'autoprefixer',
    'csscomb',
    'cssmin'
  ]);

  grunt.registerTask('js', [
    'concat',
    'uglify'
  ]);

  grunt.registerTask('img', [
    'copy:img',
    'imagemin'
  ]);

  grunt.registerTask('svg', [
    'svgmin'
  ]);
};
