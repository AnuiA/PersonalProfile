//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        //Page1
        var Page1 = new egret.DisplayObjectContainer();
        this.addChild(Page1);
        Page1.width = stageW;
        Page1.height = stageH;
        var Page1BackPhoto = this.createBitmapByName("1472468096690_jpg");
        Page1.addChild(Page1BackPhoto);
        Page1BackPhoto.width = stageW;
        Page1BackPhoto.height = stageH;
        var fillMask = new egret.Shape();
        fillMask.graphics.beginFill(0x000000, 0.5);
        fillMask.graphics.drawRect(0, 33, stageW, 1070);
        fillMask.graphics.endFill();
        // topMask.y = 33;
        Page1.addChild(fillMask);
        var icon = this.createBitmapByName("egret_icon_png");
        icon.alpha = 0.6;
        Page1.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        // var tween = egret.Tween.get(icon);
        // tween.to({x:100},2000)
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(600, 0);
        line.graphics.endFill();
        line.x = 20;
        line.y = 33 + 180;
        Page1.addChild(line);
        var EnglishColorLabel = new egret.TextField();
        EnglishColorLabel.textColor = 0xffffff;
        EnglishColorLabel.width = stageW - 180;
        EnglishColorLabel.textAlign = "left";
        EnglishColorLabel.text = "Resume";
        EnglishColorLabel.size = 60;
        EnglishColorLabel.alpha = 0;
        // colorLabel.x = 180;
        // colorLabel.y = 80;
        Page1.addChild(EnglishColorLabel);
        EnglishColorLabel.x = 180;
        EnglishColorLabel.y = 33;
        egret.Tween.get(EnglishColorLabel).to({ "alpha": 1, y: 100 }, 3000, egret.Ease.sineIn);
        // this.BlingBling(EnglishColorLabel);
        var ChineseColorLabel = new egret.TextField();
        ChineseColorLabel.textColor = 0xd4d4d4;
        ChineseColorLabel.width = stageW - 180;
        ChineseColorLabel.textAlign = "left";
        ChineseColorLabel.text = "个人简介";
        ChineseColorLabel.size = 26;
        ChineseColorLabel.alpha = 0;
        Page1.addChild(ChineseColorLabel);
        ChineseColorLabel.x = 180;
        ChineseColorLabel.y = 193;
        egret.Tween.get(ChineseColorLabel).to({ "alpha": 1, y: 160 }, 5000, egret.Ease.sineIn).call(function () { egret.Tween.get(ChineseColorLabel, { loop: true }).to({ "alpha": 0.5 }, 600, egret.Ease.sineIn); });
        function AlphaChangeAnimation(Obj, RunTime1, RunTime2) {
            var tw = egret.Tween.get(Obj);
            tw.to({ "alpha": 1 }, RunTime1);
            tw.wait(200);
            tw.to({ "alpha": 0 }, RunTime2);
            tw.call(function () { return AlphaChangeAnimation(Obj, RunTime1, RunTime2); });
        }
        var Char1 = new egret.TextField();
        Char1.text = "详";
        Char1.size = 50;
        Char1.textColor = 0xFF0000;
        Char1.x = 400;
        Char1.y = 250;
        Page1.addChild(Char1);
        AlphaChangeAnimation(Char1, 500, 300);
        egret.Tween.get(Char1, { loop: true }).to({ x: 200 }, 700).to({ x: 400 }, 600);
        var Char2 = new egret.TextField();
        Char2.text = "情";
        Char2.size = 50;
        Char2.textColor = 0xFF7F00;
        Char2.x = 300;
        Char2.y = 310;
        Page1.addChild(Char2);
        AlphaChangeAnimation(Char2, 300, 350);
        egret.Tween.get(Char2, { loop: true }).to({ x: 200 }, 300).to({ x: 400 }, 600).to({ x: 300 }, 300);
        var Char3 = new egret.TextField();
        Char3.text = "请";
        Char3.size = 50;
        Char3.textColor = 0xFFFF00;
        Char3.x = 200;
        Char3.y = 370;
        Page1.addChild(Char3);
        AlphaChangeAnimation(Char3, 250, 400);
        egret.Tween.get(Char3, { loop: true }).to({ x: 400 }, 500).to({ x: 200 }, 600);
        var Char4 = new egret.TextField();
        Char4.text = "见";
        Char4.size = 50;
        Char4.textColor = 0x00FF00;
        Char4.x = 250;
        Char4.y = 430;
        Page1.addChild(Char4);
        AlphaChangeAnimation(Char4, 400, 300);
        egret.Tween.get(Char4, { loop: true }).to({ x: 400 }, 700).to({ x: 200 }, 600).to({ x: 250 }, 300);
        var Char5 = new egret.TextField();
        Char5.text = "下";
        Char5.size = 50;
        Char5.textColor = 0x00FFFF;
        Char5.x = 320;
        Char5.y = 500;
        Page1.addChild(Char5);
        AlphaChangeAnimation(Char5, 300, 500);
        egret.Tween.get(Char5, { loop: true }).to({ x: 400 }, 600).to({ x: 200 }, 600).to({ x: 320 }, 300);
        var Char6 = new egret.TextField();
        Char6.text = "一";
        Char6.size = 50;
        Char6.textColor = 0x0000FF;
        Char6.x = 400;
        Char6.y = 560;
        Page1.addChild(Char6);
        AlphaChangeAnimation(Char6, 100, 500);
        egret.Tween.get(Char6, { loop: true }).to({ x: 300 }, 400).to({ x: 400 }, 500);
        var Char7 = new egret.TextField();
        Char7.text = "页";
        Char7.size = 50;
        Char7.textColor = 0x8B00FF;
        Char7.x = 360;
        Char7.y = 610;
        Page1.addChild(Char7);
        AlphaChangeAnimation(Char7, 420, 290);
        egret.Tween.get(Char7, { loop: true }).to({ x: 300 }, 300).to({ x: 400 }, 600);
        // */
        //Page2
        var Page2 = new egret.DisplayObjectContainer();
        this.addChild(Page2);
        Page2.width = stageW;
        Page2.height = stageH;
        Page2.y = stageH;
        var Page2BackPhoto = this.createBitmapByName("1472468096690_jpg");
        Page2.addChild(Page2BackPhoto);
        Page2BackPhoto.width = stageW;
        Page2BackPhoto.height = stageH;
        var BuildRectangle = new egret.Shape();
        BuildRectangle.graphics.lineStyle(3, 0x000000);
        BuildRectangle.graphics.drawCircle(33, 203, 5);
        BuildRectangle.graphics.lineTo(257, 203);
        BuildRectangle.graphics.drawCircle(607, 203, 5);
        BuildRectangle.graphics.drawCircle(33, 523, 5);
        BuildRectangle.graphics.drawCircle(607, 523, 5);
        BuildRectangle.graphics.lineTo(357, 523);
        BuildRectangle.graphics.endFill();
        Page2.addChild(BuildRectangle);
        var Major = new egret.TextField();
        Major.size = 30;
        Major.width = 500;
        Major.textAlign = "LEFT";
        Major.text = "专业 : 数字媒体技术";
        Major.x = 70;
        Major.y = 243;
        Page2.addChild(Major);
        var Hobbies = new egret.TextField();
        Hobbies.size = 30;
        Hobbies.width = 500;
        Hobbies.textAlign = "LEFT";
        Hobbies.text = "兴趣爱好 ：羽毛球，游泳,爱玩LOL";
        Hobbies.x = 70;
        Hobbies.y = 280;
        Page2.addChild(Hobbies);
        var HomeTown = new egret.TextField();
        HomeTown.size = 30;
        HomeTown.width = 500;
        HomeTown.textAlign = "LEFT";
        HomeTown.text = "家乡 ：湖南省、常德市";
        HomeTown.x = 70;
        HomeTown.y = 317;
        Page2.addChild(HomeTown);
        var BreifInfo = new egret.TextField();
        BreifInfo.size = 28;
        BreifInfo.width = 500;
        BreifInfo.textAlign = "LEFT";
        BreifInfo.text = "现在就读于北京工业大学软件学院数字媒体专业，大学三年级，是否考研正在斟酌，很想早点工作，本人很开放（无论哪一方面，HuaiXiao.jpg）";
        BreifInfo.x = 70;
        BreifInfo.y = 367;
        Page2.addChild(BreifInfo);
        // /*
        var textfield = new egret.TextField();
        Page2.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 160;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 35;
        textfield.textColor = 0xffffff;
        textfield.x = 60;
        textfield.y = 130;
        this.textfield = textfield;
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this);
        // */
        //滑动功能
        // /*
        this.scrollRect = new egret.Rectangle(0, 0, stageW, stageH * 2);
        this.cacheAsBitmap = true;
        this.touchEnabled = true;
        var Value_StartTouchPoin_y = 0;
        var Value_CurrentPage_y = 0;
        var Value_YMoveDistance = 0;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startScroll, this);
        function startScroll(event) {
            if ((this.scrollRect.y % stageH) != 0) {
                this.scrollRect.y = this.Value_CurrentPage_y;
            }
            Value_StartTouchPoin_y = event.stageY;
            Value_CurrentPage_y = this.scrollRect.y;
        }
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, onScroll, this);
        function onScroll(event) {
            var rect = this.scrollRect;
            Value_YMoveDistance = Value_StartTouchPoin_y - event.stageY;
            if (Value_YMoveDistance != 0) {
                rect.y = (Value_CurrentPage_y + Value_YMoveDistance);
                this.scrollRect = rect;
            }
        }
        this.addEventListener(egret.TouchEvent.TOUCH_END, stopScroll, this);
        function stopScroll(event) {
            var rect = this.scrollRect;
            if ((Value_YMoveDistance >= (stageH / 3)) && Value_CurrentPage_y < stageH) {
                rect.y = Value_CurrentPage_y + stageH;
                this.scrollRect = rect;
            }
            else if ((Value_YMoveDistance <= (-(stageH / 3))) && Value_CurrentPage_y > 0) {
                rect.y = Value_CurrentPage_y - stageH;
                this.scrollRect = rect;
            }
            else {
                rect.y = Value_CurrentPage_y;
                this.scrollRect = rect;
            }
        }
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onScroll, this);
        // */
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    p.BlingBling = function (Obj) {
        Obj.alpha = 0;
        // egret.Tween.get(Obj).to({"alpha" : 1},600);
        // ()=>{this.BlingBling(Obj);};
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map