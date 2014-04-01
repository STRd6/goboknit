window["STRd6/goboknit:master"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "goboknit\n========\n\nA tycoon game where you knit goblins with cyborgs.\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Goboknit\n========\n\nA tycoon game where you knit goblins with cyborgs.\n\nNeed to be able to buy materials and sell bespoke knitted goblins.\n\nNeedles, fibers, cyborg parts, patterns.\n\nFibers\n------\n\nWool, acrylic, bamboo, silk, gold, cotton, hemp, linen\n\nStitch Patterns\n---------------\n\nStockinette, reverse stockinette, garter stitch, seed stitch, ribbing\n\nTechniques\n----------\n\nIncreasing, decreasing, short rows, seaming, working in the round\n\nPattern\n-------\n\nUgly sweater - seaming\nNice Sweater - working in the round, increasing, decreasing, short rows\nPot Holder\n\n\n    {applyStylesheet} = require \"./util\"\n    \n    applyStylesheet(require \"./style\")\n",
      "type": "blob"
    },
    "util.coffee.md": {
      "path": "util.coffee.md",
      "mode": "100644",
      "content": "Util\n====\n\n    module.exports =\n      applyStylesheet: (style, id=\"primary\") ->\n        styleNode = document.createElement(\"style\")\n        styleNode.innerHTML = style\n        styleNode.id = id\n\n        if previousStyleNode = document.head.querySelector(\"style##{id}\")\n          previousStyleNode.parentNode.removeChild(prevousStyleNode)\n\n        document.head.appendChild(styleNode)\n\n      extend: (target, sources...) ->\n        for source in sources\n          for name of source\n            target[name] = source[name]\n\n        return target\n\n      defaults: (target, objects...) ->\n        for object in objects\n          for name of object\n            unless target.hasOwnProperty(name)\n              target[name] = object[name]\n\n        return target\n",
      "type": "blob"
    },
    "style.styl": {
      "path": "style.styl",
      "mode": "100644",
      "content": "html\n  height: 100%\n\nbody\n  margin: 0\n  background-color: red\n  height: 100%\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var applyStylesheet;\n\n  applyStylesheet = require(\"./util\").applyStylesheet;\n\n  applyStylesheet(require(\"./style\"));\n\n}).call(this);\n",
      "type": "blob"
    },
    "util": {
      "path": "util",
      "content": "(function() {\n  var __slice = [].slice;\n\n  module.exports = {\n    applyStylesheet: function(style, id) {\n      var previousStyleNode, styleNode;\n      if (id == null) {\n        id = \"primary\";\n      }\n      styleNode = document.createElement(\"style\");\n      styleNode.innerHTML = style;\n      styleNode.id = id;\n      if (previousStyleNode = document.head.querySelector(\"style#\" + id)) {\n        previousStyleNode.parentNode.removeChild(prevousStyleNode);\n      }\n      return document.head.appendChild(styleNode);\n    },\n    extend: function() {\n      var name, source, sources, target, _i, _len;\n      target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      for (_i = 0, _len = sources.length; _i < _len; _i++) {\n        source = sources[_i];\n        for (name in source) {\n          target[name] = source[name];\n        }\n      }\n      return target;\n    },\n    defaults: function() {\n      var name, object, objects, target, _i, _len;\n      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      for (_i = 0, _len = objects.length; _i < _len; _i++) {\n        object = objects[_i];\n        for (name in object) {\n          if (!target.hasOwnProperty(name)) {\n            target[name] = object[name];\n          }\n        }\n      }\n      return target;\n    }\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "style": {
      "path": "style",
      "content": "module.exports = \"html {\\n  height: 100%;\\n}\\n\\nbody {\\n  margin: 0;\\n  background-color: red;\\n  height: 100%;\\n}\";",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "entryPoint": "main",
  "repository": {
    "id": 18340637,
    "name": "goboknit",
    "full_name": "STRd6/goboknit",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://avatars.githubusercontent.com/u/18894?",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/goboknit",
    "description": "A tycoon game where you knit goblins with cyborgs.",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/goboknit",
    "forks_url": "https://api.github.com/repos/STRd6/goboknit/forks",
    "keys_url": "https://api.github.com/repos/STRd6/goboknit/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/goboknit/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/goboknit/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/goboknit/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/goboknit/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/goboknit/events",
    "assignees_url": "https://api.github.com/repos/STRd6/goboknit/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/goboknit/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/goboknit/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/goboknit/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/goboknit/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/goboknit/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/goboknit/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/goboknit/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/goboknit/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/goboknit/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/goboknit/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/goboknit/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/goboknit/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/goboknit/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/goboknit/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/goboknit/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/goboknit/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/goboknit/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/goboknit/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/goboknit/merges",
    "archive_url": "https://api.github.com/repos/STRd6/goboknit/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/goboknit/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/goboknit/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/goboknit/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/goboknit/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/goboknit/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/goboknit/labels{/name}",
    "releases_url": "https://api.github.com/repos/STRd6/goboknit/releases{/id}",
    "created_at": "2014-04-01T18:51:14Z",
    "updated_at": "2014-04-01T18:51:14Z",
    "pushed_at": "2014-04-01T18:51:14Z",
    "git_url": "git://github.com/STRd6/goboknit.git",
    "ssh_url": "git@github.com:STRd6/goboknit.git",
    "clone_url": "https://github.com/STRd6/goboknit.git",
    "svn_url": "https://github.com/STRd6/goboknit",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 0,
    "subscribers_count": 1,
    "branch": "master",
    "publishBranch": "gh-pages"
  },
  "dependencies": {}
});