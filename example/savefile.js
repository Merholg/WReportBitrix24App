<script>
var text = 'как записать строку в файл ".txt" с помощью js?';
document.write( '<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(text) + '" download="text.txt">text.txt</a>')
</script>