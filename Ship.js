function Ship(t, color) {
  this.xCenter = 0;
  this.yCenter = -height/3;
  this.zCenter = 0;
  this.type = t;
  this.color = color;
  this.blocks = [];
  this.dim = height/30;

  for(var i = 0; i < types[this.type].length; i++)  {
    var bl = new Block(this.xCenter + types[this.type][i][0]*this.dim, this.yCenter + types[this.type][i][1]*this.dim, this.zCenter + types[this.type][i][2]*this.dim, this.color);
    this.blocks.push(bl);
  }

  while(this.blocks.length < 5 && this.type != 1) {
    var bl = new Block(this.xCenter + random(chose)*this.dim, this.yCenter + random(chose)*this.dim, this.zCenter + random(chose)*this.dim, this.color);
    var ok = true;
    for(var i = 0; i < this.blocks.length; i++) {
      if(bl === this.blocks[i])
        ok = false;
      }
    if(ok)
      this.blocks.push(bl);
  }

  this.show = function()  {
    for(var i = 0; i < this.blocks.length; i++)
      this.blocks[i].show();
    push();
    ambientMaterial(this.color);
    translate(this.xCenter, this.yCenter, this.zCenter);
    box(this.dim);
    pop();
  }

  this.move = function()  {
    for(var i = 0; i < this.blocks.length; i++)
      this.blocks[i].y += this.blocks[i].dim;
    this.yCenter += this.dim;
  }










  this.Xrotate = function() {
    var Nz = [];
    var Ny = [];
    var ok = true;
    for(var i = 0; i < this.blocks.length; i++) {
      //if(this.blocks[i].z == this.zCenter || this.blocks[i].y == this.yCenter) {
        /*var y = this.blocks[i].z - this.zCenter;
        this.blocks[i].z -= - this.blocks[i].y + this.yCenter;
        this.blocks[i].y -= y;
        if(y == 0)
        this.blocks[i].y = this.yCenter;
        if(- this.blocks[i].y + this.yCenter == 0)
        this.blocks[i].z = this.zCenter;*/
        if(this.blocks[i].z == this.zCenter)  {
          Nz.push(this.blocks[i].z + (this.blocks[i].y - this.yCenter));
          Ny.push(this.yCenter);
        } else if(this.blocks[i].y == this.yCenter)  {
          Ny.push(this.blocks[i].y - (this.blocks[i].z - this.zCenter));
          Nz.push(this.zCenter);
        } else {
        //console.log(this.blocks[i].y, this.blocks[i].z, this.yCenter, this.zCenter);
        var y = this.blocks[i].y - this.yCenter;
        var z = this.blocks[i].z - this.zCenter;
        Nz.push(this.zCenter + y);
        Ny.push(this.yCenter - z);
        //console.log(y, z, this.blocks[i].y, this.blocks[i].z, this.yCenter, this.zCenter);
      }
      for(j = 0; j < world.length; j++) {
        if((world[j].z == Nz[i] && world[j].y == Ny[i] && world[j].x == this.blocks[i].x) || Nz[i] > this.dim*5 || Nz[i] < -this.dim*5) {
          ok = false;
          break;
        }
      }
    }
    if(ok)  {
      for(var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].z = Nz[i];
        this.blocks[i].y = Ny[i];
      }
    }
  }

  this.Yrotate = function() {
    var Nz = [];
    var Nx = [];
    var ok = true;
    for(var i = 0; i < this.blocks.length; i++) {
      //if(this.blocks[i].z == this.zCenter || this.blocks[i].y == this.yCenter) {
        /*var y = this.blocks[i].z - this.zCenter;
        this.blocks[i].z -= - this.blocks[i].y + this.yCenter;
        this.blocks[i].y -= y;
        if(y == 0)
        this.blocks[i].y = this.yCenter;
        if(- this.blocks[i].y + this.yCenter == 0)
        this.blocks[i].z = this.zCenter;*/
        if(this.blocks[i].z == this.zCenter)  {
          Nz.push(this.blocks[i].z + (this.blocks[i].x - this.xCenter));
          Nx.push(this.xCenter);
        } else if(this.blocks[i].x == this.xCenter)  {
          Nx.push(this.blocks[i].x - (this.blocks[i].z - this.zCenter));
          Nz.push(this.zCenter);
        } else {
        //console.log(this.blocks[i].y, this.blocks[i].z, this.yCenter, this.zCenter);
        var x = this.blocks[i].x - this.xCenter;
        var z = this.blocks[i].z - this.zCenter;
        Nz.push(this.zCenter + x);
        Nx.push(this.xCenter - z);
        //console.log(y, z, this.blocks[i].y, this.blocks[i].z, this.yCenter, this.zCenter);
      }
      for(j = 0; j < world.length; j++) {
        if((world[j].z == Nz[i] && world[j].x == Nx[i] && world[j].y == this.blocks[i].y) || Nz[i] > this.dim*5 || Nz[i] < -this.dim*5 || Nx[i] > this.dim*5 || Nx[i] < -this.dim*5) {
          ok = false;
          break;
        }
      }
    }
    if(ok)  {
      for(var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].z = Nz[i];
        this.blocks[i].x = Nx[i];
      }
    }
  }
// z->y  y->x
  this.Zrotate = function() {
    var Ny = [];
    var Nx = [];
    var ok = true;
    for(var i = 0; i < this.blocks.length; i++) {
      //if(this.blocks[i].z == this.zCenter || this.blocks[i].y == this.yCenter) {
        /*var y = this.blocks[i].z - this.zCenter;
        this.blocks[i].z -= - this.blocks[i].y + this.yCenter;
        this.blocks[i].y -= y;
        if(y == 0)
        this.blocks[i].y = this.yCenter;
        if(- this.blocks[i].y + this.yCenter == 0)
        this.blocks[i].z = this.zCenter;*/
        if(this.blocks[i].y == this.yCenter)  {
          Ny.push(this.blocks[i].y + (this.blocks[i].x - this.xCenter));
          Nx.push(this.xCenter);
        } else if(this.blocks[i].x == this.xCenter)  {
          Nx.push(this.blocks[i].x - (this.blocks[i].y - this.yCenter));
          Ny.push(this.yCenter);
        } else {
        //console.log(this.blocks[i].y, this.blocks[i].z, this.yCenter, this.zCenter);
        var x = this.blocks[i].x - this.xCenter;
        var y = this.blocks[i].y - this.yCenter;
        Ny.push(this.yCenter + x);
        Nx.push(this.xCenter - y);
        //console.log(y, z, this.blocks[i].y, this.blocks[i].z, this.yCenter, this.zCenter);
      }
      for(j = 0; j < world.length; j++) {
        if((world[j].y == Ny[i] && world[j].x == Nx[i] && world[j].z == this.blocks[i].z) || Nx[i] > this.dim*5 || Nx[i] < -this.dim*5) {
          ok = false;
          break;
        }
      }
    }
    if(ok)  {
      for(var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].y = Ny[i];
        this.blocks[i].x = Nx[i];
      }
    }
  }












  this.shift = function(dir) {
    var ok = true;
    if(dir == 1)  {
      for(var i = 0; i < this.blocks.length; i++) {
        if(this.blocks[i].z <= -this.dim*5) {
        ok = false;
        break;
      }
        for(j = 0; j < world.length; j++) {
          if(this.blocks[i].x == world[j].x && this.blocks[i].y == world[j].y && this.blocks[i].z - this.dim == world[j].z) {
          ok = false;
          break;
        }
        }
      }
      if(ok)  {
      this.zCenter -= this.dim;
      for(var i = 0; i < this.blocks.length; i++)
        this.blocks[i].z -= this.dim;
      }
    }
    if(dir == 2)  {
      for(var i = 0; i < this.blocks.length; i++) {
        if(this.blocks[i].x <= -this.dim*5) {
        ok = false;
        break;
      }
        for(j = 0; j < world.length; j++) {
          if(this.blocks[i].x - this.dim == world[j].x && this.blocks[i].y == world[j].y && this.blocks[i].z == world[j].z) {
          ok = false;
          break;
        }
        }
      }
      if(ok)  {
      this.xCenter -= this.dim;
      for(var i = 0; i < this.blocks.length; i++)
        this.blocks[i].x -= this.dim;
      }
    }
    if(dir == 3)  {
      for(var i = 0; i < this.blocks.length; i++) {
        if(this.blocks[i].z >= this.dim*5)  {
        ok = false;
        break;
      }
        for(j = 0; j < world.length; j++) {
          if(this.blocks[i].x == world[j].x && this.blocks[i].y == world[j].y && this.blocks[i].z + this.dim == world[j].z) {
          ok = false;
          break;
        }
        }
      }
      if(ok)  {
      this.zCenter += this.dim;
      for(var i = 0; i < this.blocks.length; i++)
        this.blocks[i].z += this.dim;
      }
    }
    if(dir == 4)  {
      for(var i = 0; i < this.blocks.length; i++) {
        if(this.blocks[i].x >= this.dim*5)  {
        ok = false;
        break;
      }
        for(j = 0; j < world.length; j++) {
          if(this.blocks[i].x + this.dim == world[j].x && this.blocks[i].y == world[j].y && this.blocks[i].z == world[j].z) {
          ok = false;
          break;
        }
        }
      }
      if(ok)  {
      this.xCenter += this.dim;
      for(var i = 0; i < this.blocks.length; i++)
        this.blocks[i].x += this.dim;
      }
    }
  }

  this.collision = function(bl) {
    if(bl.y - this.yCenter <= this.dim && bl.x == this.xCenter && bl.z == this.zCenter)
      return true;
    for(var i = 0; i < this.blocks.length; i++) {
      if(this.blocks[i].collide(bl))
      return true;
    }
    return false;
  }

}
