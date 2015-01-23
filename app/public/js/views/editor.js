var rte = {};

rte = {
    editor: {},

    init: function(){
        this.rteRender();
        this.events();
    },

    events: function(){
        $(document).on('click', '.save-work', function(e){
            e.preventDefault();
            rte.loader('start');
            rte.saveData();
        });
    },

    loader: function(type){
        if(type == 'start'){
            $('.icon-loader-container').fadeIn(200);
            $('.icon-loader').addClass('animate-spin');
            $('.pagecontainer').addClass('blur');
        } else {
            $('.icon-loader-container').fadeOut(200);
            $('.icon-loader').removeClass('animate-spin');
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

        $.ajax({
            url: '/readFile',
            type: 'POST',
            data: 'file=' + file
        }).done(function(data){
            rte.editor.getSession().setMode("ace/mode/" + mode);
            rte.editor.getSession().setValue(data);

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

        $.ajax({
            url: '/save',
            type: 'POST',
            data: 'file='+ file +'&code=' + code
        }).done(function(){

            rte.commitToGitHub();
        })
        .fail(function(err){
            console.log('error: ' + err);
        })
        .always(function(){

        });
    },

    commitToGitHub: function(){
        $.ajax({
            url: '/commit',
            type: 'GET',
        }).done(function(){
            console.log('Successful push');
            rte.loader('stop');
        })
        .fail(function(){
            console.log('error');
        })
        .always(function(){
            console.log('complete commit');
        });
    },



    activeEditor: function(){

        var activeEditor = $('div.active-editor');
        var editorType = activeEditor.data('editor-type');
        var file = '';

        switch(editorType){
            case 'html':
                file = 'index.html';
            break;
            case 'js':
                file = 'scripts.js';
            break;
            case 'css':
                file = 'styles.css';
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
            rte.editor.renderer.setShowGutter(false);
            rte.editor.setHighlightActiveLine(false);
            rte.editor.setShowPrintMargin(false);
            rte.editor.getSession().setValue(textarea.val());
            rte.editor.getSession().setMode("ace/mode/" + mode);
            rte.editor.setTheme("ace/theme/github");



            rte.editor.getSession().on('change', function(e) {
                var text = rte.editor.getSession().getValue();
                rte.checkInput(rte.editor, $('div.active-editor').data('editor-type'), output, text);
            });

            rte.getFileData();

        });

    },



    checkInput: function(editor, lessonData, output, text){
        var lessonContainer = lessonData;

        if(Boolean(output) === true){
            var content = rte.editor.getSession().getValue();
            $('.output .display').html(content);
        }

        if(text.indexOf('<!doctype html>') > -1) {
            console.log('success')
        }

    }
}

$(function () {
    rte.init();
});
