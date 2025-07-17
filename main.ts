namespace SpriteKind {
    export const Collectable = SpriteKind.create()
    export const Squeaker = SpriteKind.create()
}

function loadLevelTwo() {

    tiles.setCurrentTilemap(assets.tilemap`level2`)

}

info.onCountdownEnd(function () {
    
    game.over(true, effects.confetti)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    tiles.placeOnRandomTile(mySprite, assets.tile`Start`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Squeaker)
    distraction = false
    squeaker = false
    info.changeLifeBy(-1)
    rubyspeed = 20
    info.startCountdown(10)
})
// Overlap for Player and Collectable
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collectable, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    tiles.placeOnRandomTile(otherSprite, assets.tile`Spawn`)
    info.startCountdown(10)
    rubyspeed += 2
    if (!(squeaker)) {
        ruby = sprites.create(assets.image`Ruby`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(ruby, assets.tile`Start`)
        ruby.follow(mySprite, rubyspeed)
        football = sprites.create(assets.image`Football`, SpriteKind.Squeaker)
        randrug = tiles.getTileLocation(randint(3, 12), randint(3, 12))
        tiles.placeOnTile(football, randrug)
        squeaker = true
    }
})
info.onLifeZero(function () {
    game.over(true, effects.clouds)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Squeaker, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    distraction = false
    squeaker = false
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Squeaker, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
    distraction = true
    rubyspeed += 2
})
let randrug: tiles.Location = null
let football: Sprite = null
let ruby: Sprite = null
let squeaker = false
let distraction = false
let rubyspeed = 0
let level1Score = 0
let level2Score = 0
let mySprite: Sprite = null

let waterHazerd = [tiles.getTilesByType(assets.tile`hazardWater`), tiles.getTilesByType(assets.tile`hazardWater0`), tiles.getTilesByType(assets.tile`hazardWater1`), tiles.getTilesByType(assets.tile`hazardWater2`), tiles.getTilesByType(assets.tile`hazardWater3`), tiles.getTilesByType(assets.tile`hazardWater4`), tiles.getTilesByType(assets.tile`hazardWater5`), tiles.getTilesByType(assets.tile`hazardWater6`), tiles.getTilesByType(assets.tile`hazardWater7`)]
let balloonSpawnSpace = [tiles.getTilesByType(assets.tile`Area1`), tiles.getTilesByType(assets.tile`Item1`), tiles.getTilesByType(assets.tile`Area2`), tiles.getTilesByType(assets.tile`Item2`), tiles.getTilesByType(assets.tile`Area3`), tiles.getTilesByType(assets.tile`Item3`), tiles.getTilesByType(assets.tile`Area4`), tiles.getTilesByType(assets.tile`Item4`)]
let rubySpawnSpace = [tiles.getTilesByType(assets.tile`BadGuy3`)]
let area1RugSpace = [tiles.getTilesByType(assets.tile`Area1`), tiles.getTilesByType(assets.tile`NPC1`)]
let area2RugSpace = [tiles.getTilesByType(assets.tile`Area2`), tiles.getTilesByType(assets.tile`NPC2`)]
let area3RugSpace = [tiles.getTilesByType(assets.tile`Area3`), tiles.getTilesByType(assets.tile`NPC3`)]
let area4RugSpace = [tiles.getTilesByType(assets.tile`Area4`), tiles.getTilesByType(assets.tile`NPC4`)]



// Main Game Setup
scene.setBackgroundColor(12)
tiles.setCurrentTilemap(tilemap`Arena Demo`)
mySprite = sprites.create(assets.image`Ezra`, SpriteKind.Player)
for (let i = 0; i < tiles.getTilesByType(assets.tile`Spawn`).length; i++) {
    tileUtil.coverAllTiles(assets.tile`Spawn`, assets.tile`Center`)
}
tiles.placeOnRandomTile(mySprite, assets.tile`Start`)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(false)
scene.cameraFollowSprite(mySprite)
let balloons = sprites.create(assets.image`Balloons`, SpriteKind.Collectable)
tiles.placeOnRandomTile(balloons, assets.tile`Spawn`)
info.startCountdown(10)
rubyspeed = 20
forever(function () {
    if (squeaker) {
        if (distraction) {
            ruby.follow(football, rubyspeed)
            ruby.setFlag(SpriteFlag.GhostThroughWalls, true)
        } else {
            ruby.follow(mySprite, rubyspeed)
            ruby.setFlag(SpriteFlag.GhostThroughWalls, false)
        }
    }
})
