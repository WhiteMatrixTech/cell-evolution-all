// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./interfaces/ICellEvolutionNewWorld.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CellEvolutionNewWorld is ICellEvolutionNewWorld {
    using SafeMath for uint256;
    using Strings for uint256;

    bool public isOpen;
    address public admAdd;
    uint256 public totalcell;
    uint256 public historyno;
    uint256 public version;
    uint256 public inheritanceno;

    mapping(uint256 => CellHistory) cellHistorys;
    mapping(uint256 => CellEvolution) cellDBs;

    constructor() {
        admAdd = msg.sender;
        isOpen = true;
        historyno = 1;
        version = 2;
        inheritanceno = 1000;
    }

    function getCellHistory(uint256 _cellHistoryId) public view override returns (CellHistory memory) {
        return cellHistorys[_cellHistoryId];
    }

    function getCellDB(uint256 _cellDBId) public view override returns (CellEvolution memory) {
        return cellDBs[_cellDBId];
    }

    //设置开始
    function setIsOpen(bool _isopen) public override returns (bool) {
        require(msg.sender == admAdd, "Admin only");
        isOpen = _isopen;
        return true;
    }

    function setCellno(uint256 _cellno) public override returns (bool) {
        require(msg.sender == admAdd, "Admin only");
        totalcell = _cellno;
        return true;
    }

    function sethistoryno(uint256 _historyno) public override returns (bool) {
        require(msg.sender == admAdd, "Admin only");
        historyno = _historyno;
        return true;
    }

    function setVersion(uint256 _versionno) public override returns (bool) {
        require(msg.sender == admAdd, "Admin only");
        version = _versionno;
        return true;
    }
    
    function setHomeworld(uint256 _worldId, string memory _newtitle)public override returns (bool) {
        require(msg.sender == admAdd, "Admin only");
        cellHistorys[_worldId].worldtitle = _newtitle;
        return true;
    }

    function writeworld(CellHistory memory _worldDB) public override returns (bool) {
        require(msg.sender == admAdd, "Admin only");
        cellHistorys[_worldDB.id] = _worldDB;
        return true;
    }

    function writecell(CellEvolution memory _cellDB) public override returns (bool) {
        require(msg.sender == admAdd, "Admin only");
        cellDBs[_cellDB.id] = _cellDB;
        return true;
    }

    function dnamerge(
        uint256 _id,
        uint256 _cellno,
        uint256 _adaption,
        uint256 _surviveability,
        uint256 _division,
        uint256 _environment,
        uint256 _day,
        uint256 _totalscore,
        string memory _finaltitle
    ) public override returns (bool) {
        //鉴定开始
        require(isOpen, "Game is currently closed");

        require(_id != 0, "empty id");
        require(cellDBs[_id].id == 0, "system error");

        address from = address(msg.sender);
        totalcell++;

        cellDBs[_id].id = _id;
        cellDBs[_id].creator = from;

        cellDBs[_id].cellno = _cellno;
        cellDBs[_id].adaption = _adaption;
        cellDBs[_id].surviveability = _surviveability;
        cellDBs[_id].division = _division;
        cellDBs[_id].environment = _environment;
        cellDBs[_id].day = _day;
        cellDBs[_id].totalscore = _totalscore;
        cellDBs[_id].finaltitle = _finaltitle;
        cellDBs[_id].belong = historyno;
        cellDBs[_id].version = version;

        cellHistorys[historyno].id = historyno;
        cellHistorys[historyno].cellno = cellHistorys[historyno].cellno.add(_cellno);
        cellHistorys[historyno].adaption = cellHistorys[historyno].adaption.add(_adaption);
        cellHistorys[historyno].surviveability = cellHistorys[historyno].surviveability.add(_surviveability);
        cellHistorys[historyno].division = cellHistorys[historyno].division.add(_division);
        cellHistorys[historyno].environment = cellHistorys[historyno].environment.add(_environment);
        cellHistorys[historyno].day = cellHistorys[historyno].day.add(_day);
        cellHistorys[historyno].totalscore = cellHistorys[historyno].totalscore.add(_totalscore);
        cellHistorys[historyno].worldtitle = "evolutionary world";
        cellHistorys[historyno].endcellid = _id;

        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, _id.toString());
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, toString(abi.encodePacked(from)));
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, _cellno.toString());
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, _adaption.toString());
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, _surviveability.toString());
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, _division.toString());
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, _environment.toString());
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, _day.toString());
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, _totalscore.toString());
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, _finaltitle);
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, ",");
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, historyno.toString());
        cellHistorys[historyno].cellsdetail=strConcat(cellHistorys[historyno].cellsdetail, "|");

        checkdeath(
            cellHistorys[historyno].cellno,
            cellHistorys[historyno].adaption,
            cellHistorys[historyno].surviveability,
            cellHistorys[historyno].division
        );
        return true;
    }

    function newinheritance() public override returns (bool) {
        inheritanceno++;
        return true;
    }

    function worldtitlecheck() public override returns (bool) {
        uint256 inworldno = cellHistorys[historyno].endcellid.sub(cellHistorys[historyno].startcellid);
        if (inworldno > 100) {
            cellHistorys[historyno].worldtitle = "high evolution";
        } else if (inworldno > 50) {
            cellHistorys[historyno].worldtitle = "hot";
        } else {
            cellHistorys[historyno].worldtitle = "quiet";
        }
        if (cellHistorys[historyno].adaption > 10000000000) {
            cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, " advanced adaptation");
        } else if (cellHistorys[historyno].adaption > 1000000000) {
            cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, " normal adaptation");
        } else {
            cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, " low adaptation");
        }
        if (cellHistorys[historyno].surviveability > 10000000000) {
            cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, " high survival");
        } else if (cellHistorys[historyno].surviveability > 1000000000) {
            cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, " normal survival");
        } else {
            cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, " low survival");
        }
        if (cellHistorys[historyno].division > 10000000000) {
            cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, " high reproduction");
        } else if (cellHistorys[historyno].division > 1000000000) {
            cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, " normal reproduction");
        } else {
            cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, " low reproduction");
        }
        if (cellHistorys[historyno].environment > 1000) {
            cellHistorys[historyno].worldtitle = strConcat(
                cellHistorys[historyno].worldtitle,
                " high environmental resistance"
            );
        } else if (cellHistorys[historyno].division > 500) {
            cellHistorys[historyno].worldtitle = strConcat(
                cellHistorys[historyno].worldtitle,
                " normal environmental resistance"
            );
        } else {
            cellHistorys[historyno].worldtitle = strConcat(
                cellHistorys[historyno].worldtitle,
                " low environmental resistance"
            );
        }

        string memory worldtype = " human world";
        if (cellHistorys[historyno].cellno < 100000 && cellHistorys[historyno].day > 5000) {
            worldtype = " spiritual world";
        }

        if (cellHistorys[historyno].cellno > 1000000000000 && cellHistorys[historyno].day > 999) {
            worldtype = " zerg World";
        }
        if (
            cellHistorys[historyno].surviveability > 100000000000 &&
            cellHistorys[historyno].day > 999 &&
            cellHistorys[historyno].surviveability > cellHistorys[historyno].adaption &&
            cellHistorys[historyno].surviveability > cellHistorys[historyno].division
        ) {
            worldtype = " mechanical world";
        }
        if (
            cellHistorys[historyno].division > 100000000000 &&
            cellHistorys[historyno].day > 999 &&
            cellHistorys[historyno].division > cellHistorys[historyno].adaption &&
            cellHistorys[historyno].division > cellHistorys[historyno].surviveability
        ) {
            worldtype = " ocean World";
        }
        if (
            cellHistorys[historyno].adaption > 100000000000 &&
            cellHistorys[historyno].day > 999 &&
            cellHistorys[historyno].adaption > cellHistorys[historyno].surviveability &&
            cellHistorys[historyno].adaption > cellHistorys[historyno].division
        ) {
            worldtype = " rock World";
        }

        uint256 ran = randomize(100);
        if (
            cellHistorys[historyno].day > 5000 &&
            cellHistorys[historyno].surviveability == cellHistorys[historyno].adaption &&
            cellHistorys[historyno].adaption == cellHistorys[historyno].division
        ) {
            worldtype = " gaia World";
        }
        if (cellHistorys[historyno].day > 8000 && ran == 1) {
            worldtype = " dark matter world";
        }

        cellHistorys[historyno].worldtitle = strConcat(cellHistorys[historyno].worldtitle, worldtype);
        return true;
    }

    function inheritance() public view override returns (uint256[] memory) {
        uint256[] memory inheritancearray = new uint256[](4);
        if (cellHistorys[historyno].adaption > 1000000000) {
            inheritancearray[0] = randomize(100);
        } else if (cellHistorys[historyno].adaption > 100000000) {
            inheritancearray[0] = randomize(50);
        } else {
            inheritancearray[0] = randomize(10);
        }
        if (cellHistorys[historyno].surviveability > 1000000000) {
            inheritancearray[1] = randomize(100);
        } else if (cellHistorys[historyno].surviveability > 100000000) {
            inheritancearray[1] = randomize(50);
        } else {
            inheritancearray[1] = randomize(10);
        }
        if (cellHistorys[historyno].division > 1000000000) {
            inheritancearray[2] = randomize(100);
        } else if (cellHistorys[historyno].division > 100000000) {
            inheritancearray[2] = randomize(50);
        } else {
            inheritancearray[2] = randomize(10);
        }

        inheritancearray[3] = inheritanceno;
        return inheritancearray;
    }

    function checkdeath(
        uint256 _cellno,
        uint256 _adaption,
        uint256 _surviveability,
        uint256 _division
    ) public override returns (bool) {
        if (_cellno > 10000) {
            //如果没有平衡发展
            uint256 balancecheck = _adaption.add(_surviveability).add(_division).div(3);
            if (
                _adaption <= balancecheck.mul(3).div(2) &&
                _adaption >= balancecheck.div(2) &&
                _surviveability <= balancecheck.mul(3).div(2) &&
                _surviveability >= balancecheck.div(2) &&
                _division <= balancecheck.mul(3).div(2) &&
                _division >= balancecheck.div(2)
            ) {
                //平衡发展，很OK, Update
            } else {
                //die
                worldtitlecheck();
                historyno++;
                cellHistorys[historyno].id = historyno;
                cellHistorys[historyno].worldtitle = "evolutionary world";
                cellHistorys[historyno].startcellid = totalcell.add(1);
            }
        }
        return true;
    }


    function randomize(uint256 _range) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp))).mod(_range);
    }

    function strConcat(string memory _a, string memory _b) internal pure returns (string memory) {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ret = new string(_ba.length + _bb.length);
        bytes memory bret = bytes(ret);
        uint256 k = 0;
        for (uint256 i = 0; i < _ba.length; i++) bret[k++] = _ba[i];
        for (uint256 i = 0; i < _bb.length; i++) bret[k++] = _bb[i];
        return string(ret);
    }

    function toString(bytes memory data) internal pure returns(string memory) {
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint i = 0; i < data.length; i++) {
            str[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }
}
