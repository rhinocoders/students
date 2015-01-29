var rte = {};

rte = {
    editor: {},
    myDelay: 1000,
    thisDelay: 1000,
    start: Date.now(),

    init: function(){
        this.rteRender();
        this.events();
        //this.autoSave();

    },

    createTasks: function(){

        var activeEditor = $('div.active-editor');
        var editorType = activeEditor.data('editor-type');

        for( items in tasks['series'][series][editorType]){
            var task = tasks['series'][series][editorType][items].task;
            var step = tasks['series'][series][editorType][items].step;
            var pattern = tasks['series'][series][editorType][items].pattern;
            var html = '<li data-task="'+pattern+'">'+task+'</li>';

            $('div[data-step=' + step + '] ol.task-list').append(html);
        }

        rte.getTasks();
    },
    getTasks: function(type){
        var tasks = $('[data-task]');
        var currentStep = $('div[data-step]:visible');
        var i = 0;
        if(type === 'save' && tasks.length === 0){

            rte.saveData();
        }
        for(i = 0; i < tasks.length; i++){
            var task = $(tasks[i]);
            var taskVal = task.data('task');
            if(rte.editor.getSession().getValue().toLowerCase().indexOf(taskVal) >= 0){

                // Completed Task
                task.addClass('completed');

                if(type == 'save'){
                    rte.saveData();
                } else {
                    rte.loader('stop');
                }

            } else {
                rte.saveData();
            }
        }

        if($('div[data-step]:visible ol.task-list').find('li').length === $('div[data-step]:visible ol.task-list').find('li.completed').length){

            // Completed All Tasks, give this kid a badge
            $('.lesson-container .success').animate({
                top: 0,
                opacity: 1
            }, 200);

        } else {
            // Keep on working! Your almost there!
            console.log('Still have some more work to do in this section.');
        }

    },

    events: function(){
        $(document).on('click', '.save-work', function(e){
            e.preventDefault();
            if($('.ace_error').size() <= 0){
                rte.loader('start');
                rte.getTasks('save');

            } else {
                alert('please check for syntax errors!');
            }
        });

        if(location.hash !== ''){
            var locationHash = location.hash.split('#/step-')[1];
            $('[data-step]').hide();
            $('[data-step="'+locationHash+'"]').show();
        }

        $(document).on('click', '.drawer', function(e){
            e.preventDefault();
            rte.hideLesson();
        });

        $(document).on('click', '.success', function(e){
            e.preventDefault();
            $(this).parent().fadeOut(500);
            $(this).parent().next().delay(700).slideToggle(500);
            var currentStep = $(this).parent().next().data('step');
            location.hash = '/step-' + currentStep;
            $('.success').hide();
            rte.getTasks();
        });

        $(document).keydown(function(event) {

            if((event.ctrlKey || event.metaKey) && event.which == 83 ) {
                event.preventDefault();
                if($('.ace_error').size() <= 0){
                    rte.loader('start');
                    rte.saveData();
                } else {
                    alert('please check for syntax errors!');
                }
                return false;
            }
            return true;
        });


    },

    hideLesson: function(){

        if($('div.pagecontainer > div:first-child').hasClass('hide-lesson')){

            $('.lesson-container .drawer').remove();
            $('.lesson-container').append('<span class="drawer icon-collapse"></span>');
            $('div.pagecontainer > div:last-child').toggleClass('collapse-editor');
            $('div.pagecontainer > div:first-child').removeClass('hide-lesson').toggleClass('show-lesson');

        } else {
            $('.lesson-container .drawer').remove()
            $('.lesson-container').append('<span class="drawer icon-expand"></span>');
            $('div.pagecontainer > div:first-child').removeClass('show-lesson').toggleClass('hide-lesson');
            $('div.pagecontainer > div:last-child').toggleClass('expand-editor');

        }

    },

    loader: function(type){
        if(type == 'start'){
            $('.icon-loader-container').fadeIn(200);
            $('.icon-loader2').addClass('animate-spin');
            $('.pagecontainer').addClass('blur');
        } else {
            $('.icon-loader-container').fadeOut(200);
            $('.icon-loader2').removeClass('animate-spin');
            $('.pagecontainer').removeClass('blur');
        }
    },

    getFileData: function(fileName){

        var activeTab = $('span.active-editor').data('section');
        var mode = $('span.active-editor').data('mode');
        activeTab = activeTab.split('-')[1];
        $('.ace_editor').removeClass('active-editor');
        $('div[data-editor-type="'+activeTab+'"]').addClass('active-editor');

        var file = fileName || rte.activeEditor();
        var path = '';
        switch(file){
            case 'styles.css':
                path = 'styles/';
            break;
            case 'scripts.js':
                path = 'scripts/';
            break;
        }

        $.ajax({
            url: '/readFile',
            type: 'POST',
            data: 'file='+path+'' + file + '&series='+series
        }).done(function(data){
            rte.editor.getSession().setMode("ace/mode/" + mode);
            rte.editor.getSession().setValue(data);
            rte.createTasks();

        })
        .fail(function(err){
            console.log('error: ' + err);
        })
        .always(function(){

        });
    },

    saveData: function(){

        var code = rte.editor.getSession().getValue();

        var file = rte.activeEditor();
        var path = '';
            switch(file){
                case 'styles.css':
                    path = 'styles/';
                break;
                case 'scripts.js':
                    path = 'scripts/';
                break;

            }
        if($('.ace_error').size() <= 0){

            $.ajax({
                url: '/save',
                type: 'POST',
                data: '&series='+series+'&file='+path+''+ file +'&code=' + code
            }).done(function(){

                rte.commitToGitHub();
                rte.loader('stop');
            })
            .fail(function(err){
                console.log('error: ' + err);
            })
            .always(function(){

            });

        } else {
            alert('please check for syntax errors!');
        }
    },

    commitToGitHub: function(){
        $.ajax({
            url: '/commit',
            type: 'GET',
        }).done(function(){

            rte.loader('stop');
        })
        .fail(function(){
            console.log('error');
        })
        .always(function(){

        });
    },

    activeEditor: function(){

        var activeEditor = $('div.active-editor');
        var editorType = activeEditor.data('editor-type');
        var file = '';

        switch(editorType){
            case 'html':
                file = 'index.html';
                //$('.output').show();
            break;
            case 'js':
                file = 'scripts.js';
                //$('.output').hide();
            break;
            case 'css':
                file = 'styles.css';
                //$('.output').hide();
            break;
        }

        return file;
    },

    rteRender: function(){
        $('textarea[data-editor]').each(function () {
            var textarea = $(this)
                , lessonData = $(this).attr('name')
                , output = $(this).data('output')
                ;

            var mode = textarea.data('editor');

            var editDiv = $('<div>', {
                'style': 'position: absolute',
                'class': textarea.attr('class'),
                'data-editor-type': textarea.attr('name')
            }).insertBefore(textarea);

            textarea.css('display', 'none');

            rte.editor = ace.edit(editDiv[0]);
            rte.editor.renderer.setShowGutter(true);
            rte.editor.setHighlightActiveLine(false);
            rte.editor.setShowPrintMargin(false);
            rte.editor.getSession().setValue(textarea.val());
            rte.editor.getSession().setMode("ace/mode/" + mode);
            rte.editor.setTheme("ace/theme/github");

            rte.editor.setOptions({
                 maxLines: Infinity
            });

            rte.editor.getSession().on('change', function(e) {
                var text = rte.editor.getSession().getValue();
                rte.checkInput(rte.editor, $('div.active-editor').data('editor-type'), output, text);
            });


            rte.getFileData();

        });

    },



    checkInput: function(editor, lessonData, output, text){
        var lessonContainer = lessonData;

        if(Boolean(output) === true && lessonContainer !== 'js'){
            var content = rte.editor.getSession().getValue();
            $('.output .display').html(content);
        }

        if(lessonContainer == 'js'){
            var text = rte.editor.getSession().getValue();
            //eval(text);
        }



    }
}

$(function () {
    rte.init();
});
