
var count = parseInt(user.get('visitCount') || 1);
if (mbox.param('visitCount') === 'true') {
    count++;
}
if (count > 3) {
    count = 1;
}
user.set('visitCount', count);
return "msg" + count;