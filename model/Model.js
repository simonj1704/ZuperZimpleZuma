"use strict";

export default class Model{
  constructor(){
    this.head = null;
    this.tail = null;
  
  }

  dump() {
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

  randomBall() {
    const balls = ["🔴", "🔵","🟡","🟢"]
    return balls[Math.floor(Math.random()*balls.length)];
  }

  add( data ) {
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

  get( index ) {
    let node = head;
    while(index > 0) {
      node = node.next;
      index--;
    }
    return node;
  }
  
  insertBeforeNode( data, existingNode ) {
    const newNode = { data: data, next: existingNode, prev: existingNode.prev};
    // TODO: Doesn't handle if this is the first node
    existingNode.prev.next = newNode;
    existingNode.prev = newNode;
  
    return newNode;
  }

  insertAfterNode( data, existingNode ) {
    const newNode = { data: data, next: existingNode.next, prev: existingNode};
    // TODO: Doesn't handle if this is the last node
    existingNode.next.prev = newNode;
    existingNode.next = newNode;
  
    return newNode;
  }

  removeNode( existingNode ) {
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

  findMatchesAround(node){
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
}

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

/*add('🟡');
add('🟡');
add('🟡');
add('🟢');
add('🟢');
add('🔵');
add('🔵');
add('🟢');*/
