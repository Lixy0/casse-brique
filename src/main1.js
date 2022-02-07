let gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: 'rgb(0,0,0)',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {

        }
    },
    scene: new Tableau()
};
let game = new Phaser.Game(gameConfig);
