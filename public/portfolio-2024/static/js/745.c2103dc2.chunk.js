"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[745],{927:(e,t,o)=>{o.r(t),o.d(t,{default:()=>k});var i=o(9950),n=o(4752),l=o(8666);const d=n.default.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;

  @media ${l.j.tablet} {
    overflow: scroll;
  }
`,c=n.default.div`
  display: flex;
  justify-content: flex-start; /* Start aligning items */
  gap: 1rem; /* Optional: spacing between items */
  width: 100%;
  height: 90%;
  flex-direction: row;
  overflow-x: auto; /* Enable horizontal scrolling */
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Hide scrollbar in Firefox */
  -ms-overflow-style: none; /* Hide scrollbar in IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit */
  }

  @media ${l.j.tablet} {
    flex-wrap: wrap;
    overflow-x: unset; /* Optional: Adjust for tablets */
  }
`,a=n.default.div`
  min-width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  font-size: 2rem;
  color: white;
  flex-direction: column;
  padding: 1rem;

  @media ${l.j.tablet} {
    padding: 0;
  }

  img {
    object-fit: contain;
  }
`;var r=o(9897);const s={id:"backend",title:"Backend",tooltip:{content:""},children:[{id:"languages",title:"Langages",tooltip:{content:""},children:[{id:"python",title:"Python",icon:o(1558),tooltip:{content:""},children:[]},{id:"nodejs",title:"Node.js",icon:o(8931),tooltip:{content:""},children:[]},{id:"golang",title:"Go (Golang)",icon:o(3698),tooltip:{content:""},children:[]},{id:"rust",title:"Rust",icon:o(6462),tooltip:{content:""},children:[]},{id:"c",title:"C",icon:o(821),tooltip:{content:""},children:[]},{id:"cpp",title:"C++",icon:o(8917),tooltip:{content:""},children:[]},{id:"lua",title:"Lua",icon:o(7864),tooltip:{content:""},children:[]}]},{id:"databases",title:"Bases de Donn\xe9es",tooltip:{content:""},children:[{id:"sql",title:"SQL",icon:o(1830),tooltip:{content:""},children:[]},{id:"postgresql",title:"PostgreSQL",icon:o(1282),tooltip:{content:""},children:[]},{id:"mariadb",title:"MariaDB",icon:o(9378),tooltip:{content:""},children:[]},{id:"mongodb",title:"MongoDB",icon:o(1014),tooltip:{content:""},children:[]}]}]},p={id:"frontend",title:"Frontend",tooltip:{content:""},children:[{id:"frameworks",title:"Frameworks",tooltip:{content:""},children:[{id:"reactjs",title:"React.js",icon:o(2727),tooltip:{content:""},children:[]},{id:"nextjs",title:"Next.js",icon:o(2346),tooltip:{content:""},children:[]},{id:"reactnative",title:"React Native",icon:o(6070),tooltip:{content:""},children:[]},{id:"angular",title:"Angular",icon:o(9072),tooltip:{content:""},children:[]}]},{id:"flutter",title:"Flutter",icon:o(1184),tooltip:{content:""},children:[{id:"dart",title:"Dart",icon:o(4651),tooltip:{content:""},children:[]}]}]},h={id:"unix",title:"Unix",icon:o(4057),tooltip:{content:"This node is the top most level, and will be unlocked, and ready to be clicked."},children:[{id:"shell-scripting",title:"Shell Scripting",tooltip:{content:"This node is the top most level, and will be unlocked, and ready to be clicked."},children:[{id:"bash",title:"Bash",tooltip:{content:"This node is the top most level, and will be unlocked, and ready to be clicked."},children:[]},{id:"powershell",title:"PowerShell",tooltip:{content:"This node is the top most level, and will be unlocked, and ready to be clicked."},children:[]}]}]},u=[[s],[p],[{id:"devops",title:"DevOps",tooltip:{content:"",direction:"left"},children:[{id:"sre",title:"SRE (Site Reliability Engineering)",tooltip:{content:""},children:[]},{id:"kubernetes",title:"Kubernetes",icon:o(363),tooltip:{content:""},children:[{id:"helm",title:"Helm",icon:o(9808),tooltip:{content:""},children:[]},{id:"tilt",title:"Tilt",icon:o(1385),tooltip:{content:""},children:[]}]},{id:"infrastructure",title:"IaC",tooltip:{content:""},children:[{id:"terraform",title:"Terraform",icon:o(6726),tooltip:{content:""},children:[]},{id:"packer",title:"Packer",icon:o(5574),tooltip:{content:""},children:[]}]},{id:"cloudproviders",title:"Cloud Providers",tooltip:{content:""},children:[{id:"aws",title:"AWS",icon:o(993),tooltip:{content:""},children:[]},{id:"azure",icon:o(8491),title:"Azure",tooltip:{content:""},children:[]},{id:"gcp",title:"GCP (Google Cloud Platform)",icon:o(4956),tooltip:{content:""},children:[]}]},{id:"cicd",title:"CI/CD Tools",tooltip:{content:""},children:[{id:"vercel",title:"Vercel",icon:o(645),tooltip:{content:""},children:[]},{id:"jenkins",title:"Jenkins",icon:o(2544),tooltip:{content:""},children:[]},{id:"githubactions",title:"GitHub Actions",icon:o(8749),tooltip:{content:""},children:[]},{id:"gitlabci",title:"GitLab CI",icon:o(5849),tooltip:{content:""},children:[]}]}]},h]],S=[{backend:{optional:!1,nodeState:"selected"},languages:{optional:!1,nodeState:"selected"},python:{optional:!1,nodeState:"selected"},nodejs:{optional:!1,nodeState:"selected"},golang:{optional:!1,nodeState:"selected"},rust:{optional:!1,nodeState:"selected"},c:{optional:!1,nodeState:"selected"},cpp:{optional:!1,nodeState:"selected"},lua:{optional:!1,nodeState:"selected"},databases:{optional:!1,nodeState:"selected"},sql:{optional:!1,nodeState:"selected"},postgresql:{optional:!1,nodeState:"selected"},mariadb:{optional:!1,nodeState:"selected"},mongodb:{optional:!1,nodeState:"selected"}},{frontend:{optional:!1,nodeState:"selected"},frameworks:{optional:!1,nodeState:"selected"},reactjs:{optional:!1,nodeState:"selected"},nextjs:{optional:!1,nodeState:"selected"},reactnative:{optional:!1,nodeState:"selected"},angular:{optional:!1,nodeState:"selected"},flutter:{optional:!1,nodeState:"selected"},dart:{optional:!1,nodeState:"selected"}},{devops:{optional:!1,nodeState:"selected"},sre:{optional:!1,nodeState:"selected"},kubernetes:{optional:!1,nodeState:"selected"},helm:{optional:!1,nodeState:"selected"},tilt:{optional:!1,nodeState:"selected"},infrastructure:{optional:!1,nodeState:"selected"},terraform:{optional:!1,nodeState:"selected"},packer:{optional:!1,nodeState:"selected"},cloudproviders:{optional:!1,nodeState:"selected"},aws:{optional:!1,nodeState:"selected"},azure:{optional:!1,nodeState:"selected"},gcp:{optional:!1,nodeState:"selected"},cicd:{optional:!1,nodeState:"selected"},vercel:{optional:!1,nodeState:"selected"},jenkins:{optional:!1,nodeState:"selected"},githubactions:{optional:!1,nodeState:"selected"},gitlabci:{optional:!1,nodeState:"selected"}}];var b=o(4288),g=o(9014),f=o(8412),m=o(4414);const x=e=>{let{sectionsRef:t,activeIndex:o}=e;const{isMobile:i}=(0,f.A)(),l=(0,n.useTheme)(),d=o,c={border:"0",nodeBorderColor:"transparent",nodeHoverBorder:"transparent",nodeActiveBackgroundColor:l.primary,nodeIconWidth:i?"32px":"64px",nodeMobileTextNodeHeight:"1.5rem",nodeMobileTextNodeWidth:"4.5rem",nodeMobileFontSize:"0.8rem",nodeDesktopTextNodeHeight:"28px",nodeDesktopTextNodeWidth:"144px",nodeDesktopFontSize:"16px",objectFit:"contain",...(0,b.c_)(l.primary,"inset","dome")};return i?(0,m.jsx)(a,{children:(0,m.jsx)(r.SkillProvider,{children:(0,m.jsx)(r.SkillTreeGroup,{theme:c,children:()=>(0,m.jsx)(r.SkillTree,{disableHeader:!1,collapsible:!1,treeId:"",title:"",savedData:S[d],data:u[d],description:""})})})}):(0,m.jsx)(m.Fragment,{children:u.map(((e,o)=>(0,m.jsx)(a,{ref:e=>t.current[o]=e,children:(0,m.jsx)(r.SkillProvider,{children:(0,m.jsx)(r.SkillTreeGroup,{theme:c,children:()=>(0,m.jsx)(r.SkillTree,{disableHeader:!1,collapsible:!1,treeId:"",title:"",savedData:S[o],data:e,description:""})})},e[0].id)},e[0].id)))})},k=e=>{let{techStatus:t}=e;const{isMobile:o}=(0,f.A)(),[n,l]=(0,i.useState)(0),a=(0,i.useRef)([]);return(0,m.jsxs)(d,{children:[(0,m.jsx)(c,{onScroll:()=>{let e=-1,t=Number.MAX_VALUE;a.current.forEach(((o,i)=>{if(o){const n=o.getBoundingClientRect(),l=Math.abs(n.left);l<t&&(t=l,e=i)}})),-1!==e&&l(e)},children:(0,m.jsx)(x,{sectionsRef:a,activeIndex:n})}),(0,m.jsx)(g.r2,{children:u.map(((e,t)=>(0,m.jsx)(g.cL,{onClick:()=>{return e=t,void(o?l(e):a.current[e].scrollIntoView({behavior:"smooth",block:"center"}));var e},$active:t===n},t)))})]})}}}]);