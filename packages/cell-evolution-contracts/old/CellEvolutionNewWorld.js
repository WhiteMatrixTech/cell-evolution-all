"use strict";

//World data
var CellHistory = function (text) {
  if (text) {
    var obj = JSON.parse(text);
    //World id
    this.id = obj.id;
    //World cell info
    this.cellno = obj.cellno;
    this.adaption = obj.adaption;
    this.surviveability = obj.surviveability;
    this.division = obj.division;
    this.environment = obj.environment;
    this.day = obj.day;
    this.totoalscore = obj.totoalscore;
    this.worldtitle = obj.worldtitle;
    this.startcellid = obj.startcellid;
    this.endcellid = obj.endcellid;
    this.cellsdetail = obj.cellsdetail;
    this.version = obj.version;
  } else {
    this.id = 0;
    this.cellno = 0;
    this.adaption = 0;
    this.surviveability = 0;
    this.division = 0;
    this.environment = 0;
    this.day = 0;
    this.totoalscore = 0;
    this.worldtitle = "";
    this.startcellid = 0;
    this.endcellid = 0;
    this.cellsdetail = "";
    this.version = 2;
  }
};
CellHistory.prototype = {
  toString: function () {
    return JSON.stringify(this);
  },
};

// Cell data
var CellEvolution = function (text) {
  if (text) {
    var obj = JSON.parse(text);
    // Cell id
    this.id = obj.id;
    //
    this.creator = obj.creator;
    //cell info
    this.cellno = obj.cellno;
    this.adaption = obj.adaption;
    this.surviveability = obj.surviveability;
    this.division = obj.division;
    this.environment = obj.environment;
    this.day = obj.day;
    this.totoalscore = obj.totoalscore;
    this.finaltitle = obj.finaltitle;
    this.belong = obj.belong;
    this.version = obj.version;
  } else {
    this.id = 0;
    this.creator = "";
    this.cellno = 0;
    this.adaption = 0;
    this.surviveability = 0;
    this.division = 0;
    this.environment = 0;
    this.day = 0;
    this.totoalscore = 0;
    this.finaltitle = "";
    this.belong = 0;
    this.version = 2;
  }
};

CellEvolution.prototype = {
  toString: function () {
    return JSON.stringify(this);
  },
};

var CellDB = function () {
  LocalContractStorage.defineProperties(this, {
    isOpen: null,
    admAdd: null,
    totalcell: null,
    balance: null,
    readtext: null,
    historyno: null,
    version: null,
    inheritanceno: null,
  });

  LocalContractStorage.defineMapProperty(this, "cellhistory", {
    parse: function (text) {
      return new CellHistory(text);
    },
    stringify: function (o) {
      return o.toString();
    },
  });

  LocalContractStorage.defineMapProperty(this, "celldb", {
    parse: function (text) {
      return new CellEvolution(text);
    },
    stringify: function (o) {
      return o.toString();
    },
  });
};

CellDB.prototype = {
  init: function () {
    this.admAdd = "n1NJaHRXpe49fc98GtuxxYVFyq1xsYCHx9d";
    this.isOpen = true;
    this.totalcell = 0;
    this.readtext = "";
    this.balance = new BigNumber(0);
    this.historyno = 1;
    var cellworld = new CellHistory();
    this.cellhistory.put(this.historyno, cellworld);
    this.version = 2;
    this.inheritanceno = 1000;

    //acient gene merge下个版本开放
  },
  //view 拿信息
  gethistoryno: function () {
    return this.historyno;
  },

  getIsOpen: function () {
    return this.isOpen;
  },

  gettotalcell: function () {
    return this.totalcell;
  },

  getAdminAddress: function () {
    return this.admAdd;
  },
  //设置开始
  setIsOpen: function (isopen) {
    if (Blockchain.transaction.from === this.admAdd) {
      this.isOpen = isopen;
    } else {
      throw new Error("Admin only");
    }
  },

  setCellno: function (cellno) {
    if (Blockchain.transaction.from === this.admAdd) {
      this.totalcell = cellno;
    } else {
      throw new Error("Admin only");
    }
  },
  sethistoryno: function (historyno) {
    if (Blockchain.transaction.from === this.admAdd) {
      this.historyno = historyno;
    } else {
      throw new Error("Admin only");
    }
  },
  setVersion: function (versionno) {
    if (Blockchain.transaction.from === this.admAdd) {
      this.isOpen = versionno;
    } else {
      throw new Error("Admin only");
    }
  },

  donate: function () {
    var bvalue = new BigNumber(Blockchain.transaction.value);
    this.balance = bvalue.add(this.balance);
  },

  writeworlds: function (worldsdb) {
    if (Blockchain.transaction.from === this.admAdd) {
      this.readtext = worldsdb;
      var singleworld = worldsdb.split("||");

      for (var i = 0; i < singleworld.length; i++) {
        if (singleworld[i] != "") {
          var singleworldinfo = singleworld[i].split(":");
          var basicworldinfo = singleworldinfo[0].split(",");
          var newsingleworld = new CellHistory();
          newsingleworld.id = basicworldinfo[0];
          newsingleworld.cellno = basicworldinfo[1];
          newsingleworld.adaption = basicworldinfo[2];
          newsingleworld.surviveability = basicworldinfo[3];
          newsingleworld.division = basicworldinfo[4];
          newsingleworld.environment = basicworldinfo[5];
          newsingleworld.day = basicworldinfo[6];
          newsingleworld.totoalscore = basicworldinfo[7];
          newsingleworld.worldtitle = "None";
          newsingleworld.startcellid = basicworldinfo[8];
          newsingleworld.endcellid = basicworldinfo[9];
          newsingleworld.cellsdetail = singleworldinfo[1];
          newsingleworld.version = 1;
          this.cellhistory.put(newsingleworld.id, newsingleworld);
        }
      }
    } else {
      throw new Error("Admin only");
    }
  },
  writecells: function (cellsdb) {
    if (Blockchain.transaction.from === this.admAdd) {
      this.readtext = cellsdb;
      var singlecell = cellsdb.split("|");
      for (var i = 0; i < singlecell.length; i++) {
        if (singlecell[i] != "") {
          var singlecellinfo = singlecell[i].split(",");
          var newsinglecell = new CellEvolution();
          newsinglecell.id = singlecellinfo[0];
          newsinglecell.creator = singlecellinfo[1];
          newsinglecell.cellno = singlecellinfo[2];
          newsinglecell.adaption = singlecellinfo[3];
          newsinglecell.surviveability = singlecellinfo[4];
          newsinglecell.division = singlecellinfo[5];
          newsinglecell.environment = singlecellinfo[6];
          newsinglecell.day = singlecellinfo[7];
          newsinglecell.totoalscore = singlecellinfo[8];
          newsinglecell.finaltitle = singlecellinfo[9];
          newsinglecell.belong = singlecellinfo[10];
          newsinglecell.version = 1;
          this.celldb.put(newsinglecell.id, newsinglecell);
        }
      }
    } else {
      throw new Error("Admin only");
    }
  },

  getcellstxt: function () {
    return this.readtext;
  },

  //, cellno, adaption, surviveability, division, environment, day, totoalscore, finaltitle
  dnamerge: function (
    id,
    cellno,
    adaption,
    surviveability,
    division,
    environment,
    day,
    totoalscore,
    finaltitle
  ) {
    //鉴定开始
    if (!this.isOpen) {
      throw new Error("Game is currently closed");
    }
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    var bvalue = new BigNumber(Blockchain.transaction.value);
    if (value < 0.0001) {
      throw new Error("not enough to merge");
    }
    this.balance = bvalue.add(this.balance);

    //trim

    id = id.trim();

    cellno = cellno.trim();
    adaption = adaption.trim();
    surviveability = surviveability.trim();
    division = division.trim();
    environment = environment.trim();
    day = day.trim();
    totoalscore = totoalscore.trim();
    finaltitle = finaltitle.trim();

    if (id === "") {
      throw new Error("empty id");
    }

    var from = Blockchain.transaction.from;
    var cell = this.celldb.get(id);

    if (cell) {
      throw new Error("system error");
    }
    this.totalcell++;

    cell = new CellEvolution();

    cell.id = id;
    cell.creator = from;

    cell.cellno = cellno;
    cell.adaption = adaption;
    cell.surviveability = surviveability;
    cell.division = division;
    cell.environment = environment;
    cell.day = day;
    cell.totoalscore = totoalscore;
    cell.finaltitle = finaltitle;
    cell.belong = this.historyno;
    cell.version = this.version;
    this.celldb.put(id, cell);

    var newcellworld = this.cellhistory.get(this.historyno);
    newcellworld.id = this.historyno;
    newcellworld.cellno = parseInt(newcellworld.cellno) + parseInt(cellno);
    newcellworld.adaption =
      parseInt(newcellworld.adaption) + parseInt(adaption);
    newcellworld.surviveability =
      parseInt(newcellworld.surviveability) + parseInt(surviveability);
    newcellworld.division =
      parseInt(newcellworld.division) + parseInt(division);
    newcellworld.environment =
      parseInt(newcellworld.environment) + parseInt(environment);
    newcellworld.day = parseInt(newcellworld.day) + parseInt(day);
    newcellworld.totoalscore =
      parseInt(newcellworld.totoalscore) + parseInt(totoalscore);
    newcellworld.worldtitle = "进化中的世界";
    newcellworld.cellsdetail =
      newcellworld.cellsdetail +
      id.toString() +
      "," +
      from +
      "," +
      cellno.toString() +
      "," +
      adaption.toString() +
      "," +
      surviveability.toString() +
      "," +
      division.toString() +
      "," +
      environment.toString() +
      "," +
      day.toString() +
      "," +
      totoalscore.toString() +
      "," +
      finaltitle.toString() +
      "," +
      newcellworld.id +
      "|";

    newcellworld.endcellid = parseInt(id);

    this.cellhistory.set(this.historyno, newcellworld);

    this.checkdeath(
      newcellworld.cellno,
      newcellworld.adaption,
      newcellworld.surviveability,
      newcellworld.division
    );
  },
  newinheritance: function () {
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    var bvalue = new BigNumber(Blockchain.transaction.value);

    if (value < 0.00001) {
      throw new Error("not enough to merge");
    } else {
      this.inheritanceno++;
    }

    this.balance = bvalue.add(this.balance);
  },

  worldtitlecheck: function () {
    var newcellworld = this.cellhistory.get(this.historyno);

    var inworldno =
      parseInt(newcellworld.endcellid) - parseInt(newcellworld.startcellid);
    if (inworldno > 100) {
      newcellworld.worldtitle = "高度进化";
    } else if (inworldno > 50) {
      newcellworld.worldtitle = "热闹";
    } else {
      newcellworld.worldtitle = "寂静";
    }

    if (newcellworld.adaption > 10000000000) {
      newcellworld.worldtitle = newcellworld.worldtitle + " 高度适应";
    } else if (newcellworld.adaption > 1000000000) {
      newcellworld.worldtitle = newcellworld.worldtitle + " 正常适应";
    } else {
      newcellworld.worldtitle = newcellworld.worldtitle + " 低适应";
    }

    if (newcellworld.surviveability > 10000000000) {
      newcellworld.worldtitle = newcellworld.worldtitle + " 高度生存";
    } else if (newcellworld.surviveability > 1000000000) {
      newcellworld.worldtitle = newcellworld.worldtitle + " 正常生存";
    } else {
      newcellworld.worldtitle = newcellworld.worldtitle + " 低生存";
    }

    if (newcellworld.division > 10000000000) {
      newcellworld.worldtitle = newcellworld.worldtitle + " 高度繁殖";
    } else if (newcellworld.division > 1000000000) {
      newcellworld.worldtitle = newcellworld.worldtitle + " 正常繁殖";
    } else {
      newcellworld.worldtitle = newcellworld.worldtitle + " 低繁殖";
    }

    if (newcellworld.environment > 1000) {
      newcellworld.worldtitle = newcellworld.worldtitle + " 高度环境抵抗";
    } else if (newcellworld.division > 500) {
      newcellworld.worldtitle = newcellworld.worldtitle + " 正常环境抵抗";
    } else {
      newcellworld.worldtitle = newcellworld.worldtitle + " 低环境抵抗";
    }

    var worldtype = "";
    worldtype = " 人类世界";
    if (newcellworld.cellno < 100000 && newcellworld.day > 5000) {
      worldtype = " 精神世界";
    }

    if (newcellworld.cellno > 1000000000000 && newcellworld.day > 999) {
      worldtype = " 虫族世界";
    }

    if (
      newcellworld.surviveability > 100000000000 &&
      newcellworld.day > 999 &&
      newcellworld.surviveability > newcellworld.adaption &&
      newcellworld.surviveability > newcellworld.division
    ) {
      worldtype = " 机械世界";
    }

    if (
      newcellworld.division > 100000000000 &&
      newcellworld.day > 999 &&
      newcellworld.division > newcellworld.adaption &&
      newcellworld.division > newcellworld.surviveability
    ) {
      worldtype = " 海洋世界";
    }
    if (
      newcellworld.adaption > 100000000000 &&
      newcellworld.day > 999 &&
      newcellworld.adaption > newcellworld.surviveability &&
      newcellworld.adaption > newcellworld.division
    ) {
      worldtype = " 岩石世界";
    }

    var ran = this.randomize(0, 100);

    if (
      newcellworld.day > 5000 &&
      newcellworld.surviveability == newcellworld.adaption &&
      newcellworld.adaption == newcellworld.division
    ) {
      worldtype = " 盖亚世界";
    }

    if (newcellworld.day > 8000 && ran == 1) {
      worldtype = " 暗物质世界";
    }

    newcellworld.worldtitle = newcellworld.worldtitle + worldtype;

    this.cellhistory.set(this.historyno, newcellworld);
  },

  randomize: function (lower, upper) {
    return Math.floor(Math.random() * (upper - lower) + lower);
  },

  inheritance: function () {
    var newcellworld = this.cellhistory.get(this.historyno);
    var inheritancearray = [];

    if (newcellworld.adaption > 1000000000) {
      inheritancearray.push(this.randomize(0, 100));
    } else if (newcellworld.adaption > 100000000) {
      inheritancearray.push(this.randomize(0, 50));
    } else {
      inheritancearray.push(this.randomize(0, 10));
    }

    if (newcellworld.surviveability > 1000000000) {
      inheritancearray.push(this.randomize(0, 100));
    } else if (newcellworld.surviveability > 100000000) {
      inheritancearray.push(this.randomize(0, 50));
    } else {
      inheritancearray.push(this.randomize(0, 10));
    }

    if (newcellworld.division > 1000000000) {
      inheritancearray.push(this.randomize(0, 100));
    } else if (newcellworld.division > 100000000) {
      inheritancearray.push(this.randomize(0, 50));
    } else {
      inheritancearray.push(this.randomize(0, 10));
    }
    inheritancearray.push(this.inheritanceno);

    return inheritancearray;
  },

  checkdeath: function (cellno, adaption, surviveability, division) {
    if (cellno > 10000) {
      //如果没有平衡发展
      var balancecheck = (adaption + surviveability + division) / 3;
      if (
        adaption <= balancecheck * 1.5 &&
        adaption >= balancecheck * 0.5 &&
        surviveability <= balancecheck * 1.5 &&
        surviveability >= balancecheck * 0.5 &&
        division <= balancecheck * 1.5 &&
        division >= balancecheck * 0.5
      ) {
        //平衡发展，很OK, Update
      } else {
        //die
        this.worldtitlecheck();
        this.historyno++;
        var cellworld = new CellHistory();
        cellworld.id = this.historyno;
        cellworld.cellno = 0;
        cellworld.adaption = 0;
        cellworld.surviveability = 0;
        cellworld.division = 0;
        cellworld.environment = 0;
        cellworld.day = 0;
        cellworld.totoalscore = 0;
        cellworld.worldtitle = "进化中的世界";
        cellworld.startcellid = parseInt(this.totalcell) + 1;
        this.cellhistory.put(this.historyno, cellworld);
      }
    }
  },
  setHomeworld: function (worldid, newtitle) {
    if (Blockchain.transaction.from === this.admAdd) {
      var newcellworld = this.cellhistory.get(worldid);
      newcellworld.worldtitle = newtitle;
      this.cellhistory.set(this.historyno, newcellworld);
    } else {
      throw new Error("Admin only");
    }
  },

  getbalance: function () {
    return this.balance;
  },

  getworld: function (historyno) {
    historyno = historyno.trim();
    if (historyno === "") {
      throw new Error("empty key");
    }
    return this.cellhistory.get(historyno);
  },

  getcurrentworld: function () {
    return this.cellhistory.get(this.historyno);
  },

  get: function (id) {
    id = id.trim();
    if (id === "") {
      throw new Error("empty key");
    }
    return this.celldb.get(id);
  },
};
module.exports = CellDB;
