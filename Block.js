function Block(x, y, z, c)  {
  this.dim = height/30;
  this.x = x;
  this.y = y;
  this.z = z;
  this.color = c;

  this.show = function()  {
    push();
    ambientMaterial(this.color);
    translate(this.x, this.y, this.z);
    box(this.dim);
    pop();
  }

  this.collide = function(blc) {
    if(blc.y - this.y <= this.dim && blc.x ==  this.x && blc.z === this.z)
      return true;
    return false;
  }
}
