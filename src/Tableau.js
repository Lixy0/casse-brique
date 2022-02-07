class Tableau extends Phaser.Scene {

    /**
     * Précharge les assets
     */
    preload() {
        this.load.image('carre','asset/carre.png');
        this.load.image('balle','asset/cercle.png');
    }

/**
 * Affiche les assets/placement/size
 */
create () {
    this.hauteurlargeur=800

    //affichage ball
    this.balle = this.physics.add.sprite(this.hauteurlargeur/2,710,'balle').setOrigin(0,0);
    this.balle.setDisplaySize(20,20);
    //actions de rebondisement/speed
    this.balle.body.setBounce(1.5,1.5);
    this.balle.setVelocityX(Phaser.Math.Between(0,0));
    this.balle.setVelocityY(Phaser.Math.Between(200,-200));
    this.balle.body.setMaxVelocityX(100,100);
    this.balle.body.setMaxVelocityY(500,500);

    //joueur(physique, taille)
    this.joueur = this.physics.add.sprite(300,this.hauteurlargeur-20,'carre').setOrigin(0,0);
    this.joueur.setDisplaySize(200,20);
    this.joueur.body.setAllowGravity(false);
    this.joueur.setImmovable(true);

    //briques(physique, taille)
    //TODO trouver comment faire une boucle de brique (classe ? etc) pour faire en sorte de pas écrire 10000 lignes de codes.
    this.brique = this.physics.add.sprite(380,330,'carre').setOrigin(0,0);
    this.brique.setDisplaySize(60,30);
    this.brique.body.setAllowGravity(false);
    this.brique.setImmovable(true);


    //-// LES MURS //-//
    //TODO trouver le même moyen pour les briques mais avec les murs ?
    //mur haut(physique, taille)
    this.murH = this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
    this.murH.setDisplaySize(this.hauteurlargeur,20);
    this.murH.body.setAllowGravity(false);
    this.murH.setImmovable(true);
    //mur gauche(physique, taille)
    this.murG = this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
    this.murG.setDisplaySize(20,this.hauteurlargeur);
    this.murG.body.setAllowGravity(false);
    this.murG.setImmovable(true);
    //mur droite(physique, taille)
    this.murD = this.physics.add.sprite(this.hauteurlargeur-20,0,'carre').setOrigin(0,0);
    this.murD.setDisplaySize(20,this.hauteurlargeur);
    this.murD.body.setAllowGravity(false);
    this.murD.setImmovable(true);

    //colliders murs/balle
    this.physics.add.collider(this.balle,this.murH);
    this.physics.add.collider(this.balle,this.murG);
    this.physics.add.collider(this.balle,this.murD);

    //colliders joueur/balle
    let me = this;
    this.physics.add.collider(this.balle, this.joueur, function() {
        console.log ("touche balle/joueur")
        me.rebond(me.joueur)
    });

    this.physics.add.collider(this.balle,this.brique);

    this.initKeyboard()
    this.balleAucentre();

    this.padSpeed = 0
}

//TODO variable en fonction de ou touche la balle
    rebond(players){

        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers =(this.balle.x-players.y);

        positionRelativePlayers = (positionRelativePlayers/hauteurPlayers);

        positionRelativePlayers = (positionRelativePlayers*2-1);
        console.log(positionRelativePlayers);

        this.balle.setVelocityY( this.balle.body.velocity.y + positionRelativePlayers * hauteurPlayers)

    }

    //fonction reset de la balle
    balleAucentre() {
        this.balle.x = this.hauteurlargeur/2
        this.balle.y = 650
        this.speedY = 0

        this.balle.setVelocityY(Math.random() > 0.5 ? -300 : 300)
        this.balle.setVelocityX(0)
    }

    loose(joueur){
        joueur.vie--;
        this.balleAucentre()
    }

update () {
    if (this.balle.y > this.hauteurlargeur){
        this.loose(this.joueur);
    }
    //joueur GAUCHE (verif collisions mur haut/bas)
    if (this.joueur.x < 20) {
        this.padSpeed = 0
        this.joueur.x = 21
    }
    if (this.joueur.x > 580) {
        this.padSpeed = 0
        this.joueur.x = 579
    }

    this.joueur.x += this.padSpeed
}


initKeyboard(){
    let me = this
    this.input.keyboard.on('keydown', function (kevent) {
        switch (kevent.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                me.padSpeed = -5
                break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                me.padSpeed = 5
                break;
        }
    });
    this.input.keyboard.on('keyup', function(kevent)
    {
        switch (kevent.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                me.padSpeed = 0
                break
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                me.padSpeed = 0
                break
        }
    });

}

} //END