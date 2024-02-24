"use strict";

export default class Model{
  constructor(){
    this.head = null;
    this.tail = null;
  
  }

  dump() {
    let node = this.head;
    let output = "";
    while(node != null) {
      output += '"' + node.data + '"';
      output += " -> ";
     
      node = node.next;
    }
    output += "null";
    console.log(output);
  }

  randomBall() {
    const balls = ["🔴", "🔵","🟡","🟢"]
    return balls[Math.floor(Math.random()*balls.length)];
  }

  add( data ) {
    const node = {data: data, next: null, prev: this.tail};
    if( this.head == null ) {
      // this is the first (and only) node
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return node;
  }

  get( index ) {
    let node = this.head;
    while(index > 0) {
      node = node.next;
      index--;
    }
    return node;
  }
  
  insertBeforeNode( data, existingNode ) {
    const newNode = { data: data, next: existingNode, prev: existingNode.prev};
    // TODO: Doesn't handle if this is the first node
    if (existingNode.prev == null){
      this.head = newNode;
      newNode.prev = null;
      existingNode.prev = newNode;
    } else {
    existingNode.prev.next = newNode;
    existingNode.prev = newNode;
    }
  
    return newNode;
  }

  insertAfterNode( data, existingNode ) {
    const newNode = { data: data, next: existingNode.next, prev: existingNode};
    // TODO: Doesn't handle if this is the last node
    if (existingNode.next == null){
      this.tail = newNode;
      newNode.next = null;
      existingNode.next = newNode;
    } else {
    existingNode.next.prev = newNode;
    existingNode.next = newNode;
    }
  
    return newNode;
  }

  removeNode( existingNode ) {
    const prev = existingNode.prev;
    const next = existingNode.next;
  
    if(prev == null) {
      // this is the first node - make head point to the next one
      this.head = existingNode.next;
      // and make this one point back to nothing
      if(this.head)
      this.head.prev = null;
    } 
    
    if(next == null) {
      // this is the last node - make tail point to the one before
      this.tail = existingNode.prev;
      if(this.tail)
      this.tail.next = null;
    }
  
    if(existingNode.prev)
      existingNode.prev.next = existingNode.next;
    if(existingNode.next)
      existingNode.next.prev = existingNode.prev;
  }

  findMatchesAround(node){
    let matches = [];
    let indexes = [];
    matches.push(node);
    indexes.push(this.getIndexOfNode(node));
    // go left until we find a different color
    let before = node.prev;
    while(before != null && before.data == node.data) {
      matches.push(before);
      indexes.push(this.getIndexOfNode(before));
      before = before.prev;
    }
  

    // go right until we find a different color
    let after = node.next;
    while(after != null && after.data == node.data) {
      matches.push(after);
      indexes.push(this.getIndexOfNode(after));
      after = after.next;
    }

    console.log(matches)
    
    if(matches.length >= 3) {
      matches.forEach( node => {
        this.removeNode(node);
      });
      this.dump();

    }
    return indexes;
  }

  getIndexOfNode(node){
    let index = 0;
    let currentNode = this.head;
    while (currentNode != node){
      currentNode = currentNode.next;
      index++;
    }
    return index;
  }
}
/*
let head = null;
let tail = null;

function dump() {
  let node = head;
  let output = "";
  while(node != null) {
    output += '"' + node.data + '"';
    output += " -> ";
   
    node = node.next;
  }
  output += "null";
  console.log(output);
}

function randomBall() {
  const balls = ["🔴", "🔵","🟡","🟢"]
  return balls[Math.floor(Math.random()*balls.length)];
}

function add( data ) {
  const node = {data: data, next: null, prev: tail};
  if( head == null ) {
    // this is the first (and only) node
    head = node;
    tail = node;
  } else {
    tail.next = node;
    tail = node;
  }
  return node;
}

function get( index ) {
  let node = head;
  while(index > 0) {
    node = node.next;
    index--;
  }
  return node;
}

function insertBeforeNode( data, existingNode ) {
  const newNode = { data: data, next: existingNode, prev: existingNode.prev};
  // TODO: Doesn't handle if this is the first node
  existingNode.prev.next = newNode;
  existingNode.prev = newNode;

  return newNode;
}

function insertAfterNode( data, existingNode ) {
  const newNode = { data: data, next: existingNode.next, prev: existingNode};
  // TODO: Doesn't handle if this is the last node
  existingNode.next.prev = newNode;
  existingNode.next = newNode;

  return newNode;
}

function removeNode( existingNode ) {
  const prev = existingNode.prev;
  const next = existingNode.next;

  if(prev == null) {
    // this is the first node - make head point to the next one
    head = existingNode.next;
    // and make this one point back to nothing
    if(head)
      head.prev = null;
  } 
  
  if(next == null) {
    // this is the last node - make tail point to the one before
    tail = existingNode.prev;
    if(tail)
      tail.next = null;
  }

  if(existingNode.prev)
    existingNode.prev.next = existingNode.next;
  if(existingNode.next)
    existingNode.next.prev = existingNode.prev;
}

function findMatchesAround(node){
  let matches = [];
  matches.push(node);
  // go left until we find a different color
  let before = node.prev;
  while(before != null && before.data == node.data) {
    matches.push(before);
    before = before.prev;
  }
  let difBefore = before.prev;

  // go right until we find a different color
  let after = node.next;
  while(after != null && after.data == node.data) {
    matches.push(after);
    after = after.next;
  }

  console.log(matches)
  
  if(matches.length >= 3) {
    matches.forEach( node => {
      removeNode(node);
    });
    dump();
    findMatchesAround(difBefore);
  }
}
*/
/*add('🟡');
add('🟡');
add('🟡');
add('🟢');
add('🟢');
add('🔵');
add('🔵');
add('🟢');*/
