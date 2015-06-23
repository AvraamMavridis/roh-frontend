var MediaObject = (function () {
    function MediaObject() {
        return {
            replace: true,
            templateUrl: './partials/mediaobject/mediaobject.html',
            scope: {
                item: '=',
                index: '='
            },
            link: function ($scope) {
            }
        };
    }
    return MediaObject;
})();
module.exports = MediaObject;
