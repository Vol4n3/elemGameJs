(function () {
    "use strict";

    const PERSO_PANEL = document.getElementById('personnage_panel');
    var stats_config = {};
    const LANG = "fr";
    fetch('/js/stats_config.json').then(
        blob => blob.json()).then(
            data => {
                stats_config = data;
                ready();
            });
    class Elements_stat {
        constructor(elements) {
            if (elements) {
                this.earth = elements.earth || 0;
                this.fire = elements.fire || 0;
                this.nature = elements.nature || 0;
                this.wind = elements.wind || 0;
                this.water = elements.water || 0;
                this.lightning = elements.lightning || 0;
                this.arcane = elements.arcane || 0;

            }
        }
        getValues() {
            var res = {};
            for (let i in this) {
                res[i] = this[i];
            }
            return res;
        }

    }
    class Resists extends Elements_stat {
        constructor(elements) {
            super(elements);
        }
    }
    class Bonus extends Elements_stat {
        constructor(elements) {
            super(elements);
        }
    }
    class Personnage {
        constructor(name, stats) {
            this.name = name || " ";
            if (stats) {
                this.level = stats.level || 0;
                this.xp = stats.xp || 0;
                this.pvMax = stats.pvMax || 0;
                this.pv = stats.pv || 0;
                this.manaMax = stats.manaMax || 0;
                this.mana = stats.mana || 0;
                this.strength = stats.strength || 0;
                this.intel = stats.intel || 0;
                this.wisdom = stats.wisdom || 0;
                this.agility = stats.agility || 0;
                this.resists = new Resists(stats.resists || {});
                this.bonus = new Bonus(stats.bonus || {});
            }
        }
        getValues() {
            var res = {};
            for (let i in this) {
                if (typeof (this[i]) == "object") {
                    res[i] = this[i].getValues();
                } else {
                    res[i] = this[i];
                }
            }
            return res;
        }
    }
    class Htmlstat {
        constructor(name, value) {
            this.info = stats_config[name];
            this.name = this.info.lang[LANG];
            this.value = value;
            this.wraper = document.createElement('div');
            this.wraper.className = this.info.type;
            this.wraper.setAttribute('statname',name);
            this.wraper.appendChild(this.getText());
            this.wraper.appendChild(this.getValue());
        }
        getText() {
            let label = document.createElement('span');
            label.textContent = this.name;
            label.className = "label";
            label.style.backgroundColor = this.info.bgColor;
            label.style.color = this.info.textColor;
            return label;
        }
        getValue() {
            let value = document.createElement('span');
            value.className = "value";
            value.textContent = this.value;
            return value;
        }
        getBtn() {
            let btn = document.createElement('button');
            this.wraper.appendChild(btn);
            return this.wraper;
        }
        getLabel(){
            return this.wraper;
        }


    }
    class FichePersonnage {
        constructor(perso) {
            this.perso = perso || new Personnage("Noname", {});
        }
        show() {
            if (PERSO_PANEL.firstChild) {
                PERSO_PANEL.removeChild(PERSO_PANEL.firstChild);
            }
            let wrap = document.createElement('div');
            wrap.className = "persostat"
            let stats = this.perso.getValues();

            for (let i in stats) {
                if (typeof (stats[i]) == "object") {
                    let temp = stats[i];
                    let htmlstat = new Htmlstat(i, "" );
                    wrap.appendChild(htmlstat.getLabel());
                    for(let j in temp){
                        let htmlstat = new Htmlstat(j, temp[j]);
                        wrap.appendChild(htmlstat.getLabel());
                    }
                 }
                 else {
                    let htmlstat = new Htmlstat(i, stats[i]);
                    wrap.appendChild(htmlstat.getLabel());
                }
            }
            PERSO_PANEL.appendChild(wrap)
        }
    }
    function ready(){
        var p = new Personnage("lol", {});
        var f = new FichePersonnage(p);
        f.show();
    }

})()
