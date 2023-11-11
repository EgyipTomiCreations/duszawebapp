const weblapadatlekerdezes = require('./backend-weblap-adatlekerdezes');
weblapadatlekerdezes((err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});