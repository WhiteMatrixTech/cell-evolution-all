// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface ICellEvolutionNewWorld {

    struct CellHistory {
        uint256 id;
        uint256 cellno;
        uint256 adaption;
        uint256 surviveability;
        uint256 division;
        uint256 environment;
        uint256 day;
        uint256 totalscore;
        string worldtitle;
        uint256 startcellid;
        uint256 endcellid;
        string cellsdetail;
        uint256 version;
    }

    struct CellEvolution {
        uint256 id;
        address creator;
        uint256 cellno;
        uint256 adaption;
        uint256 surviveability;
        uint256 division;
        uint256 environment;
        uint256 day;
        uint256 totalscore;
        string finaltitle;
        uint256 belong;
        uint256 version;
    }

    function getCellHistory(uint256 _cellHistoryId) external view returns (CellHistory memory);

    function getCellDB(uint256 _cellDBId) external view returns (CellEvolution memory);

    function setIsOpen(bool _isopen) external returns (bool);

    function setCellno(uint256 _cellno) external returns (bool);

    function sethistoryno(uint256 _historyno) external returns (bool);

    function setVersion(uint256 _versionno) external returns (bool);

    function setHomeworld(uint256 _worldId, string memory _newtitle)external returns (bool);

    function writeworld(CellHistory memory _worldDB) external returns (bool);

    function writecell(CellEvolution memory _cellDB) external returns (bool);

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
    ) external returns (bool);

    function newinheritance() external returns (bool);

    function worldtitlecheck() external returns (bool);

    function inheritance() external view returns (uint256[] memory);

    function checkdeath(
        uint256 _cellno,
        uint256 _adaption,
        uint256 _surviveability,
        uint256 _division
    ) external returns (bool);
}
