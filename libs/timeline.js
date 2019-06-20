var Timeline = (function () {
  'use strict';

  class TimeLine {
    constructor() {
      this.init();
    }

    init() {
      this.selectTimeSupporter();
      this.stop();
      this.point = {};
      this.long = {};
    }

    selectTimeSupporter() {
      if (performance) {
        this.now = () => performance.now();
      } else {
        this.now = () => Date.now();
      }
    }

    stop() {
      if (this.status === "STOP") return;
      this.status = "STOP";
      this.time = null;
      this.startTime = null;
      this.allPointStop();
    }

    play() {
      if (this.status === "PLAY") return;

      if (this.status === "STOP") {
        this.time = this.getTime();
        this.status = "PLAY";
        this.startTime = this.now();
      }

      if (this.status === "PAUSED") {
        this.status = "PLAY";
        this.startTime = this.now();
      }

      if (this.status === "PLAY_BACK") {
        this.pause();
        this.status = "PLAY";
        this.startTime = this.now();
      }
    }

    playBack() {
      if (this.status === "PLAY_BACK") return;

      if (this.status === "STOP") {
        this.time = this.getTime();
        this.status = "PLAY_BACK";
        this.startTime = this.now();
      }

      if (this.status === "PAUSED") {
        this.status = "PLAY_BACK";
        this.startTime = this.now();
      }

      if (this.status === "PLAY") {
        this.pause();
        this.status = "PLAY_BACK";
        this.startTime = this.now();
      }
    }

    pause() {
      if (this.status === "PAUSED") return;
      if (this.status === "STOP") return;

      if (this.status === "PLAY") {
        this.time = this.getTime();
        this.status = "PAUSED";
        this.startTime = null;
      }

      if (this.status === "PLAY_BACK") {
        this.time = this.getTime();
        this.status = "PAUSED";
        this.startTime = null;
      }
    }

    getTime() {
      if (this.status === "STOP") return 0;
      if (this.status === "PLAY") return this.time + (this.now() - this.startTime);
      if (this.status === "PLAY_BACK") return this.time - (this.now() - this.startTime);
      if (this.status === "PAUSED") return this.time;
    }

    getPoint(name) {
      if (!name) return 0;
      const time = this.getTime();

      if (this.point[name] === undefined || this.point[name] === null) {
        this.point[name] = time;
      }

      const temp = time - this.point[name];
      this.point[name] = time;
      return temp;
    }

    getLong(name) {
      if (!name) return 0;
      const time = this.getTime();

      if (this.long[name] === undefined || this.long[time] === null) {
        this.long[name] = time;
      }

      return time - this.long[name];
    }

    allPointStop() {
      for (let name in this.point) {
        this.point[name] = null;
      }
    }

    allLongStop() {
      for (let name in this.long) {
        this.long[name] = null;
      }
    }

  }

  return TimeLine;

}());
