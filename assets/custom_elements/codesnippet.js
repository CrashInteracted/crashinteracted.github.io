class CodeSnippet extends HTMLElement {
    static observedAttributes = ["data-code", "data-lang", "data-name"];
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        // Create elements
        const mainBox = document.createElement("div");
        mainBox.setAttribute("class", "code-snippet")

        const header = document.createElement("div");
        header.setAttribute("class", "snippet-header");

        const circles = document.createElement("div");
        circles.setAttribute("class", "snippet-decorative-circles");

        const redCircle = document.createElement("span");
        redCircle.setAttribute("class", "snippet-decorative-circle snippet-decorative-circle-red");

        const yellowCircle = document.createElement("span");
        yellowCircle.setAttribute("class", "snippet-decorative-circle snippet-decorative-circle-yellow");

        const greenCircle = document.createElement("span");
        greenCircle.setAttribute("class", "snippet-decorative-circle snippet-decorative-circle-green");

        const title = document.createElement("span");
        title.setAttribute("class", "snippet-lang");
        title.textContent = this.getAttribute("data-lang") + (this.getAttribute("data-name").length > 0 ? " | " : "");

        const name = document.createElement("small");
        name.textContent = this.getAttribute("data-name");

        const copyButton = document.createElement("button");
        copyButton.setAttribute("class", "copy-button");
        copyButton.setAttribute("onclick", "navigator.clipboard.writeText('" + this.getAttribute("data-code") + "')");
        copyButton.textContent = "Copy";

        const textArea = document.createElement("pre");
        textArea.setAttribute("class", "snippet-content jetbrains-mono-crashint");

        const code = document.createElement("code");
        code.textContent = this.getAttribute("data-code").replace(/\\n/g, "\n"); // replace escaped newlines with actual newlines for display

        const script = document.createElement("script");
        // script.textContent = 'hljs.highlightAll();' // Higlighting doesn't work for some reason and I don't want to fix it right now

        // Create some CSS to apply to the shadow dom
        const style = document.createElement("style");

        style.textContent = `
.code-snippet {
    font-family: Arial, sans-serif;
    color: white;
    text-align: left;
    border: 1px solid #888;
    margin: 10px 0;
    background-color: #0c1420;
    border-radius: 5px;
}

.snippet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #070c14;
        /* Top | Right | Bottom | Left */
    padding: 10px 10px 10px 10px;
    margin-bottom: 5px;
    border-bottom: 1px solid #888;
    border-radius: 5px 5px 0px 0px; 
}

.snippet-content {
    font-size: 13px;
    line-height: 1.2;
    padding: 10px;
    overflow-x: auto;
}

.copy-button {
    background-color: #0066ff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
}

.jetbrains-mono-crashint {
  font-family: "JetBrains Mono";
  /* font-optical-sizing: auto; */
  font-weight: 400;
  font-style: normal;
}

.snippet-decorative-circles {
    display: flex;
}

.snippet-decorative-circle {
    border-radius: 50%;
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    box-sizing: border-box;
    margin: 3px;
    opacity: 0.9;
}

.snippet-decorative-circle:hover {
    opacity: 1;
}

.snippet-decorative-circle-red {
    background-color: #fe5c51;
}

.snippet-decorative-circle-yellow {
    background-color: #fac800;
}

.snippet-decorative-circle-green {
    background-color: #35c759;
}
        `;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        shadow.appendChild(script);
        shadow.appendChild(mainBox);
        // Header
        mainBox.appendChild(header);
        header.appendChild(circles);
        circles.appendChild(redCircle);
        circles.appendChild(yellowCircle);
        circles.appendChild(greenCircle);
        header.appendChild(title);
        title.appendChild(name);
        header.appendChild(copyButton);
        // Code
        mainBox.appendChild(textArea);
        textArea.appendChild(code);
        
    }
}

customElements.define("code-snippet", CodeSnippet);