//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Nuntium {

    struct Article {
        address publisher;
        string title;
        string text;
    }

    struct Profile {
        string name;
        uint256[] articles;
    }

    Article[] public articles;
    mapping(address => Profile) profiles;
    address private owner;

    constructor () {
        owner = msg.sender;
    }

    function publishArticle(string calldata _title, string calldata _text) external {
        Article memory article = Article({ publisher: msg.sender, title: _title, text: _text });
        profiles[msg.sender].articles.push(articles.length);
        articles.push(article);
    }

    function getArticle(uint _index) external view returns(Article memory) {
        return articles[_index];
    }

    function getArticles() external view returns(Article[] memory) {
        return articles;
    }

    function setProfileName(string calldata _name) external {
        profiles[msg.sender].name = _name;
    }

    function getProfileArticles(address _profile) external view returns(uint256[] memory) {
        return profiles[_profile].articles;
    }

    function getProfileName(address _profile) external view returns(string memory) {
        return profiles[_profile].name;
    }

    function getProfile(address _profile) external view returns(Profile memory) {
        return profiles[_profile];
    }
}

