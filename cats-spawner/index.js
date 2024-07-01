document.getElementById('spawnButton').addEventListener("click", SpawnCat);

function SpawnCat(){
    console.log('spawncat')
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = 40;
    ctx.canvas.height = 40;

    ctx.beginPath();
    ctx.fillStyle = getRandomColor().toString();    // Set color
    // Draw head
    ctx.rect(11, 12, 18, 3); // 1
    ctx.rect(10, 15, 20, 9); // 2
    ctx.rect(12, 24, 16, 1); // 3
    // Draw body
    ctx.rect(16, 25, 8, 2); // 4
    ctx.rect(14, 27, 12, 5); // 5
    ctx.rect(12, 32, 16, 6); // 6

    // Ear
    ctx.rect(12, 8, 2, 1); // 1
    ctx.rect(26, 8, 2, 1); // 1
    ctx.rect(12, 9, 3, 1); // 2
    ctx.rect(25, 9, 3, 1); // 2
    ctx.rect(11, 10, 4, 1); // 3
    ctx.rect(25, 10, 4, 1); // 3
    ctx.rect(11, 11, 5, 1); // 4
    ctx.rect(24, 11, 5, 1); // 4

    // Tail
    ctx.rect(28, 35, 2, 3);
    ctx.rect(30, 34, 2, 4);
    ctx.rect(32, 32, 2, 4);
    ctx.rect(32, 27, 4, 4);
    ctx.rect(33, 31, 3, 1);
    ctx.rect(32, 32, 4, 2);

    ctx.fill();

    // Eyes
    ctx.beginPath();
    ctx.rect(14, 16, 2, 4);
    ctx.rect(24, 16, 2, 4);
    ctx.fillStyle = 'white';
    ctx.fill();

    document.getElementById('catsDiv').appendChild(canvas);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[ Math.floor(Math.random() * 16) ];
    }
    
    return color;
  }