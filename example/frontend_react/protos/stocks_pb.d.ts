import * as jspb from 'google-protobuf'



export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class StocksList extends jspb.Message {
  getStocksList(): Array<Stock>;
  setStocksList(value: Array<Stock>): StocksList;
  clearStocksList(): StocksList;
  addStocks(value?: Stock, index?: number): Stock;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StocksList.AsObject;
  static toObject(includeInstance: boolean, msg: StocksList): StocksList.AsObject;
  static serializeBinaryToWriter(message: StocksList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StocksList;
  static deserializeBinaryFromReader(message: StocksList, reader: jspb.BinaryReader): StocksList;
}

export namespace StocksList {
  export type AsObject = {
    stocksList: Array<Stock.AsObject>,
  }
}

export class Stock extends jspb.Message {
  getSymbol(): string;
  setSymbol(value: string): Stock;

  getName(): string;
  setName(value: string): Stock;

  getPrice(): number;
  setPrice(value: number): Stock;

  getTime(): string;
  setTime(value: string): Stock;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Stock.AsObject;
  static toObject(includeInstance: boolean, msg: Stock): Stock.AsObject;
  static serializeBinaryToWriter(message: Stock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Stock;
  static deserializeBinaryFromReader(message: Stock, reader: jspb.BinaryReader): Stock;
}

export namespace Stock {
  export type AsObject = {
    symbol: string,
    name: string,
    price: number,
    time: string,
  }
}

export class StockSymbol extends jspb.Message {
  getSymbol(): string;
  setSymbol(value: string): StockSymbol;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StockSymbol.AsObject;
  static toObject(includeInstance: boolean, msg: StockSymbol): StockSymbol.AsObject;
  static serializeBinaryToWriter(message: StockSymbol, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StockSymbol;
  static deserializeBinaryFromReader(message: StockSymbol, reader: jspb.BinaryReader): StockSymbol;
}

export namespace StockSymbol {
  export type AsObject = {
    symbol: string,
  }
}

export class User extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    username: string,
  }
}

export class UserStock extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): UserStock;

  getSymbolList(): Array<string>;
  setSymbolList(value: Array<string>): UserStock;
  clearSymbolList(): UserStock;
  addSymbol(value: string, index?: number): UserStock;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserStock.AsObject;
  static toObject(includeInstance: boolean, msg: UserStock): UserStock.AsObject;
  static serializeBinaryToWriter(message: UserStock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserStock;
  static deserializeBinaryFromReader(message: UserStock, reader: jspb.BinaryReader): UserStock;
}

export namespace UserStock {
  export type AsObject = {
    username: string,
    symbolList: Array<string>,
  }
}

