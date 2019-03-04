import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@shared/services';
import * as circularJSON from 'circular-json';
import { IFlowchart } from '@models/flowchart';
import { ProcedureTypes } from '@models/procedure';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.font = '12px sans-serif';

@Component({
  selector: 'panel-header',
  templateUrl:  'panel-header.component.html',
  styleUrls: ['panel-header.component.scss']
})
export class PanelHeaderComponent {

    @Input() flowchart: IFlowchart;
    executeCheck: boolean;
    dialogBox: HTMLDialogElement;

    urlSet = ['', 'publish', '', '', ''];
    urlValid: boolean;
    urlNodes;

    constructor(private dataService: DataService, private router: Router) {
        if (this.router.url === '/about' || this.router.url === '/gallery') {
            this.executeCheck = false;
        } else {
            this.executeCheck = true;
        }
    }


    getUrl() {
        return this.router.url;
    }
    getNode() {
        return this.flowchart.nodes[this.flowchart.meta.selected_nodes[0]];
    }

    changeNode(index: number) {
        this.dataService.flowchart.meta.selected_nodes = [index];
        if (this.router.url === '/editor' &&
           (index === 0 || index === this.dataService.flowchart.nodes.length - 1)) { setTimeout(() => {
            this.adjustTextArea();
        }, 50); }
    }

    adjustTextArea() {
        let textarea = document.getElementById('flowchart-desc');
        if (textarea) {
            const desc = this.dataService.flowchart.description.split('\n');
            const textareaWidth = textarea.getBoundingClientRect().width - 30;
            let lineCount = 0;
            for (const line of desc) {
                lineCount += Math.floor(ctx.measureText(line).width / textareaWidth) + 1;
            }
            textarea.style.height = lineCount * 14 + 4 + 'px';

            for (const prod of this.dataService.node.procedure) {
                if (prod.type !== ProcedureTypes.Constant) { continue; }
                textarea = document.getElementById(prod.ID + '_desc');
                if (textarea && prod.meta.description) {
                    const prodDesc = prod.meta.description.split('\n');
                    const prodTextareaWidth = textarea.getBoundingClientRect().width - 30;
                    let prodLineCount = 0;
                    for (const line of prodDesc) {
                        prodLineCount += Math.floor(ctx.measureText(line).width / prodTextareaWidth) + 1;
                    }
                    textarea.style.height = prodLineCount * 14 + 4 + 'px';
                }
            }
        }
        textarea = document.getElementById('flowchart-return');
        if (textarea) {
            const desc = (this.dataService.flowchart.returnDescription || '').split('\n');
            const textareaWidth = textarea.getBoundingClientRect().width - 30;
            let lineCount = 0;
            for (const line of desc) {
                lineCount += Math.floor(ctx.measureText(line).width / textareaWidth) + 1;
            }
            textarea.style.height = lineCount * 14 + 4 + 'px';
        }
    }



    loadFile() {
        document.getElementById('file-input').click();
        // this.router.navigate(['/dashboard']);
    }

    openDropdownMenu(e: MouseEvent) {
        /*
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
        }
        */
       const stl = document.getElementById('dropdownMenu').style;
       if (!stl.display || stl.display === 'none') {
            const pos = document.getElementById('dropdownMenuButton').getBoundingClientRect();
            stl.left = (pos.left + 34 - 100) + 'px';
            stl.display = 'block';
            // const bRect = (<Element>e.target).getBoundingClientRect();
            // stl.transform = `translate(` + bRect.left + `px, ` + bRect.height + `px)`;
        } else {
            stl.display = 'none';
        }
        e.stopPropagation();
    }

    openNodeMenu(e: MouseEvent) {
        const stl = document.getElementById('nodeMenu').style;
        if (!stl.display || stl.display === 'none') {
            stl.display = 'block';
        } else {
            stl.display = 'none';
        }
        e.stopPropagation();

    }


    openUrlDialog(event) {
        event.stopPropagation();
        this.dialogBox = <HTMLDialogElement>document.getElementById('genUrlDialog');
        this.dialogBox.showModal();
    }

    @HostListener('window:click', ['$event'])
    onWindowClick(event: MouseEvent) {
        const dropdownMenu = document.getElementById('dropdownMenu');
        if (dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
        const nodeMenu = document.getElementById('nodeMenu');
        if (nodeMenu) {
            nodeMenu.style.display = 'none';
        }
        const galleryMenu = document.getElementById('galleryMenu');
        if (galleryMenu) {
            galleryMenu.style.display = 'none';
        }
        const helpMenu = document.getElementById('helpMenu');
        if (helpMenu) {
            helpMenu.style.display = 'none';
        }
        if (this.dialogBox) {
            if ((<HTMLElement>event.target).tagName === 'SELECT') { return; }

            const rect = this.dialogBox.getBoundingClientRect();

            const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
              && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                this.dialogBox.close();
                this.dialogBox = undefined;
            }
        }
    }

    validateUrl() {
        if (this.urlSet[0] === '') {
            this.urlValid = false;
            return;
        }
        const request = new XMLHttpRequest();

        let url = this.urlSet[0];
        if (url.indexOf('dropbox') !== -1) {
            url = url.replace('www', 'dl').replace('?dl=0', '');
        }
        request.open('GET', url);

        request.onload = () => {
            if (request.status === 200) {
                try {
                    const f = circularJSON.parse(request.responseText);
                    this.urlNodes = f.flowchart.nodes;
                    this.urlValid = true;
                } catch (ex) {
                    this.urlValid = false;
                }
            } else {
                this.urlValid = false;
            }
        };
        request.onerror = () => {
            this.urlValid = false;
        };
        request.send();
    }

    generateUrl() {
        if (this.urlSet[0] === '') {
            return;
        }
        if (this.urlSet[1] === 'publish') {
            this.urlSet[2] = '';
            this.urlSet[3] = '';
        } else if (this.urlSet[2] === '') {
            this.urlSet[3] = '';
        } else if (this.urlSet[3] === '') {
            this.urlSet[2] = '';
        }

        let url = this.urlSet[0];
        if (url.indexOf('dropbox') !== -1) {
            url = url.replace('www', 'dl').replace('?dl=0', '');
        }
        url = url.replace(/\//g, '%2F');

        const txtArea = document.getElementById('generatedLink');
        txtArea.innerHTML = `${window.location.origin}/${this.urlSet[1]}` +
                            `?file=${url}${this.urlSet[2]}${this.urlSet[3]}${this.urlSet[4]}`;
    }

}
