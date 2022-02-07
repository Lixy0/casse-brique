class Joueur {

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
        this.$score.textContent=  this._score
        console.log(this)
    }

    get vie() {
        return this._vie;
    }

    set vie(value) {
        this._vie = value;
        this.$vie.textContent=  this._vie
        console.log(this)
    }
    constructor(scoreId,vieId) {
        this._score = 0;
        this.scoreId = scoreId;
        this.$el = document.getElementById(scoreId);
        this.$score = this.$el.querySelector(".score")

        this._vie = 3;
        this.vieId = vieId;
        this.$el = document.getElementById(vieId);
        this.$vie = this.$el.querySelector(".vie")
    }
}
