"use strict";
cc._RF.push(module, '138fcpbZJVKZr9W0FCnAf40', 'GameEvent');
// script/src/top/liubowen/core/event/GameEvent.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameEvent = function () {
    function GameEvent(eventCode) {
        this.eventCode = eventCode;
    }
    GameEvent.cast = function (event) {
        return event;
    };
    return GameEvent;
}();
exports.GameEvent = GameEvent;

cc._RF.pop();