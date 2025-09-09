/** @format */

let shown = false;
let viewpoints = document.getElementsByClassName('Viewpoint');
let views = document.getElementsByClassName('View');
let questData = JSON.parse(localStorage.getItem('questsStatus')) || {
  completedQuests: [],
  currentLevel: 0
};
function show(viewObj) {
  for (viewpoint of viewpoints) {
    viewpoint.classList.remove('Activepoint');
  }
  for (view of views) {
    view.classList.remove('Activeview');
  }
  event.currentTarget.classList.add('Activepoint');
  document.getElementById(viewObj).classList.add('Activeview');
}
let anime = true;
let sentFirst = false;
const animationBtn = document.getElementById('Anime');
let animeText = document.getElementById('animeText');
animationBtn.addEventListener('click', animate);
let Icons = document.querySelectorAll('.Icon');
let skillCards = document.querySelectorAll('.skill-card');
let titles = document.querySelectorAll('.subTitle');
let shownWelcome = false;
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const welcomeHTML = document.getElementById('passionModal').innerHTML;
let cardTitle = document.getElementById('cardTitle');
let cardImage = document.getElementById('cardImage');
let cardDescription = document.getElementById('cardDescription');

function animate() {
  console.log('Animate function called. Current anime state:', anime);
  updateQuestStatus('AnimationsTask', true);
  if (anime) {
    animeText.textContent = 'Enable Animations';
    for (s = 0; s < skillCards.length; ++s) {
      skillCards[s].classList.remove('bounce');
    }
    for (t = 0; t < titles.length; ++t) {
      titles[t].classList.remove('bounce');
    }
    anime = false;
    console.log('Scrolling to #FooterSection');
    window.location.assign(`#FooterSection`);
    setTimeout(backHome, 2000);
  } else {
    animeText.textContent = 'Disable Animations';
    for (s = 0; s < skillCards.length; ++s) {
      skillCards[s].classList.add('bounce');
    }
    for (t = 0; t < titles.length; ++t) {
      titles[t].classList.add('bounce');
    }
    anime = true;

    console.log('Scrolling to #FooterSection');
    window.location.assign(`#FooterSection`);
    setTimeout(backHome, 2000);
  }
}
function backHome() {
  console.log('backHome called, scrolling to top');
  window.location.assign(`#`);
  console.log('WEEEE'); // Debugging
}

function checkNotifications() {
  if (notification.style.display == 'flex') {
    notyf.error('You already have a message.');
    return true;
  } else {
    startCountingTime();
  }
  notification.style.display = 'flex';
  return false;
}
function showNotification(text, number) {
  if (checkNotifications()) {
    return;
  } else {
    notificationText.textContent = `${text}`;
    notification.classList.add('show');
    notification.addEventListener('click', () => showPopUp(number), {
      once: true
    });
  }
}
let loader = document.getElementById('preloader');
window.addEventListener('load', function (load) {
  // Initial Dom Loaded //
  this.window.removeEventListener('load', load, false);
  switch (window.location.hash) {
    case '#tos':
      showToS();
      break;
    case '#follow':
      showNotification(`Thanks for following...`, 4);
      followedGitHub();
      break;
    case '#star':
      showNotification(`Thanks for starring...`, 5);
      updateQuestStatus('LikeProjectTask', true);
      break;
    case '#ban':
      showNotification(`Hope you learnt your lesson...`, 10);
  }
  initializeNavigation();
  loadQuests();
  checkQuests();
  this.setTimeout(function () {
    let scrollPos = window.scrollY;
    loader.style.display = 'none';
    unlockScreen();
    window.scrollTo(0, scrollPos);
    let greet = localStorage.getItem('greeted');
    if (!greet) {
      showNotification(`Hey ! I'm Passion...`, 1);
      document
        .getElementById('cardClose')
        .addEventListener('click', greetedUser, { once: true });
    }
    let currentname = localStorage.getItem('username');
    if (currentname) {
      document.getElementById('user-name').textContent = currentname;
      document.getElementById('card-name').textContent = currentname;
      updateQuestStatus('TalktoPassionTask', true);
    }

    shownWelcome = true;
  }, 500);
});

function initializeNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navPanel = document.getElementById('nav-panel');
  const navClose = document.getElementById('nav-close');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll(`.nav-links li`);
  const levelShower = document.getElementById('levelShower');

  levelShower.addEventListener('click', () => {
    showLevelCard();
    closeNav();
  });

  // Open Navigation Panel
  navToggle.addEventListener('click', () => {
    gsap.to(navPanel, { right: '0%', duration: 0.5, ease: 'power3.out' });
    gsap.to(navOverlay, { opacity: 1, visibility: 'visible', duration: 0.3 });
  });

  if (questData.currentLevel == 0) {
    navToggle.addEventListener(
      'click',
      () => {
        updateQuestStatus('NavigationTask', true);
      },
      { once: true }
    );
  }

  // Close Navigation Panel
  navClose.addEventListener('click', closeNav);
  navOverlay.addEventListener('click', closeNav);
  navLinks.forEach((navLink) => {
    navLink.addEventListener('click', closeNav);
  });

  function closeNav() {
    gsap.to(navPanel, { right: '-100%', duration: 0.5, ease: 'power3.in' });
    gsap.to(navOverlay, { opacity: 0, visibility: 'hidden', duration: 0.3 });
  }
}
function greetedUser() {
  localStorage.setItem('greeted', true);
  showLevelCard();
}

function followedGitHub() {
  if (questData.currentLevel == 0) {
    updateQuestStatus('GitHubTask', true);
  }
}
function downloadCV() {
  downloadFile(
    'Documents/Tinotenda Mhedziso CV.pdf',
    'Tinotenda Mhedziso CV.pdf'
  );
  updateQuestStatus('CVTask', true);
}
function downloadFile(fileUrl, fileName) {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function openGitHub() {
  navigateToSite('https://github.com/Passion-Over-Pain');
}

function openEmail() {
  navigateToSite('mailto:tinomhedziso21@gmail.com');
}
function openDevTo() {
  navigateToSite('https://dev.to/passionoverpain');
}
function navigateToSite(fileUrl) {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function resetQuestStatuses() {
  localStorage.removeItem('questsStatus');
  const quests = document.querySelectorAll('#checklist input');
  quests.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.disabled = true;
  });

  shown = false;
}
const levelNames = ['Guest', 'Acquaintance', 'Companion', 'Friend'];
let questNames = [];
const quests = {
  Guest: [
    { id: 'NavigationTask', text: 'Open nav menu' },
    { id: 'HelpModeTask', text: 'Toggle Help Mode' },
    { id: 'AnimationsTask', text: 'Toggle Animations' },
    { id: 'ToSTask', text: 'Accept ToS' },
    { id: 'TalktoPassionTask', text: 'Talk to Passion' },
    { id: 'SocialTask', text: 'View: A Social post' }
  ],
  Acquaintance: [
    { id: 'LinkedInTask', text: 'View: LinkedIn profile' },
    { id: 'ProjectSiteTask', text: 'View: A Project site' },
    { id: 'ProjectCodeTask', text: 'View: A Project code' },
    { id: 'LikeProjectTask', text: 'Like A Project' },
    { id: 'CVTask', text: 'Download my CV' },
    { id: 'GitHubTask', text: 'Follow me: GitHub' }
  ],
  Companion: [
    { id: 'MusicTask', text: 'Listen to a song' },
    { id: 'ProStatusTask', text: 'View: Professional status' },
    { id: 'CasStatusTask', text: 'View: Casual status' },
    { id: 'GameTask', text: 'Coming Soon' },
    { id: 'LikeWebsiteTask', text: 'Like this website' },
    { id: 'SecretTask', text: 'Coming Soon' }
  ]
};
function getUserLevel() {
  let userlvl = questData.currentLevel;

  if (userlvl >= 3) return 'Friend';
  if (userlvl >= 2) return 'Companion';
  if (userlvl >= 1) return 'Acquaintance';
  return 'Guest';
}

function checkQuests() {
  // Ensure completedQuests is an array
  if (!Array.isArray(questData.completedQuests)) {
    questData.completedQuests = [];
  }

  // Loop through completed quests and check their corresponding checkboxes
  questData.completedQuests.forEach((questId) => {
    let checkbox = document.getElementById(questId);
    if (checkbox) {
      checkbox.checked = true;
    }
  });
  document.getElementById('user-level').textContent = `Level: ${
    levelNames[questData.currentLevel]
  }`;
  let levelImg = document.getElementById('level-image');
  levelImg.src = `Images/${levelNames[questData.currentLevel]}.webp`;
  let levelTitle = document.getElementById('card-title');
  levelTitle.textContent = `Level: ${levelNames[questData.currentLevel]}`;
}

function loadQuests() {
  const userLevel = getUserLevel();
  const questContainer = document.getElementById('checklist');
  questNames = quests[userLevel].map((quest) => quest.id);

  questContainer.innerHTML = '';

  // Load the current set of quests
  quests[userLevel].forEach((quest) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = quest.id;
    checkbox.disabled = true;
    checkbox.checked =
      JSON.parse(localStorage.getItem('questsStatus'))?.[quest.id] || false;

    const label = document.createElement('label');
    label.htmlFor = quest.id;
    label.textContent = quest.text;

    questContainer.appendChild(checkbox);
    questContainer.appendChild(label);
  });
}

function updateQuestStatus(questId, status) {
  // Ensure completedQuests is an array
  if (!Array.isArray(questData.completedQuests)) {
    questData.completedQuests = [];
  }
  // Ensure Passion checks an existing quest Id
  if (questNames.includes(questId)) {
    if (status && !questData.completedQuests.includes(questId)) {
      questData.completedQuests.push(questId);
      document.getElementById(`${questId}`).checked = true;
    } else if (!status) {
      questData.completedQuests = questData.completedQuests.filter(
        (q) => q !== questId
      );
    }
  } else return;

  // Check if all quests in the current level are complete
  let levelComplete = questData.completedQuests.length >= 6;

  if (levelComplete && questData.currentLevel < 3) {
    questData.currentLevel++;
    loadQuests();
    document.getElementById('user-level').textContent = `Level: ${
      levelNames[questData.currentLevel]
    }`;
    questData.completedQuests = [];
    unlockLevel();
  }

  localStorage.setItem('questsStatus', JSON.stringify(questData));
}
function unlockLevel() {
  let levelImg = document.getElementById('level-image');
  let levelTitle = document.getElementById('card-title');
  levelImg.src = `Images/${levelNames[questData.currentLevel]}.webp`;
  levelTitle.textContent = `Level: ${levelNames[questData.currentLevel]}`;
  showLevelCard();
  notyf.success('New Quests unlocked!');
  notyf.success('New Level unlocked!');
}
function showLevelCard() {
  const levelCard = document.getElementById('level-up-card');
  levelCard.style.display = 'inline-block';

  gsap.set(levelCard, {
    opacity: 0,
    y: 500
  });

  gsap.to(levelCard, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'ease.inOut'
  });
}

function closeLevelCard() {
  const levelCard = document.getElementById('level-up-card');

  gsap.to(levelCard, {
    y: -500,
    opacity: 0,
    duration: 0.5,
    ease: 'ease.inOut',
    onComplete: () => {
      levelCard.style.display = 'none';
      gsap.set(levelCard, { y: 0, opacity: 1 });
    }
  });
}

function show404() {
  showNotification('<Access Denied>', 6);
}
function showPopUp(message) {
  const modalBg = document.getElementById('passionModal');
  const passionCard = document.getElementById('passionCard');

  modalBg.style.display = 'flex';

  gsap.fromTo(
    passionCard,
    { y: '-100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.6, ease: 'power2.out' } // Slide down smoothly
  );
  lockScreen();
  stopCountingTime();
  switch (message) {
    case 1:
      {
        cardTitle.textContent = 'Site Navigation';
        cardDescription.textContent = ` Hey! I'm <Passion>, Tino's personalized AI chatbot. Welcome to our portfolio website. Here are some helpful tips while navigating the site. If you know you're ready, feel free to skip this guide.`;
        document.getElementById('cardTable').style.display = 'grid';
        cardImage.src = 'Images/Icons/her.svg';
      }
      break;
    case 2:
      {
        cardTitle.textContent = 'Name Pronunciation';
        cardDescription.textContent = `Tinotenda Mhedziso, or Tino for short, is pronounced Tea-no-ten-da. His name translates to "Thank you."`;
        cardImage.src = 'Images/Icons/speak.svg';
      }
      break;
    case 3:
      {
        cardTitle.textContent = 'Portfolio Projects';
        cardDescription.textContent = `By clicking the <Code> button, you’ll be directed to the GitHub repository, where you can explore a detailed case study covering the project’s objectives, challenges, and key insights. The <Site> button lets you experience the project firsthand, but if it’s unavailable, simply download it to run locally. While some projects are hidden for now, Tino is eagerly preparing to release them soon — consider this a sneak peek of what's to come!`;
        cardImage.src = 'Images/Icons/website.svg';
      }
      break;
    case 4:
      {
        cardTitle.textContent = 'GitHub Follow';
        cardDescription.textContent = `Thanks for following! Stay tuned for exciting updates and new features coming your way.`;
        cardImage.src = 'Images/Icons/follow.svg';
      }
      break;
    case 5:
      {
        cardTitle.textContent = 'GitHub Star';
        cardDescription.textContent = `You're an absolute star! ⭐Get it? because you starred a repo?... listen: blame Tino — he forgot to delete his bad jokes from my database. Anyway, thanks for the support😊! .`;
        cardImage.src = 'Images/Icons/star.svg';
      }
      break;
    case 6:
      {
        cardTitle.textContent = '404: Failed to load resource';
        cardDescription.textContent = `This resource is currently hidden. Please check again later...Whenever that is. 😊`;
        cardImage.src = 'Images/Icons/error.svg';
      }
      break;
    case 7:
      {
        cardTitle.textContent = 'Quests Complete !';
        cardDescription.textContent = `Yayyy, You completed all the quests and for that I now promote you from internet guest to a friend of ours.`;
      }
      break;
    case 8:
      {
        cardTitle.textContent = 'Supporting Tino';
        cardDescription.textContent = `Oh? You want to support Tino? That’s awesome! 😄 He doesn’t take donations, but you can help by offering him a developer job at your company 😉. What ... No company? No problem! A simple follow on GitHub means a lot. Thanks! 💚`;
        cardImage.src = 'Images/Icons/support.svg';
      }
      break;
    case 9:
      {
        cardTitle.textContent = 'Unacceptable behaviour';
        cardDescription.textContent = `Wait… did you just decline the Terms of Service? 🤨 You do realize that without agreement, you can’t access any of Tino’s amazing creations, right? Well, if that’s your final decision… I’m afraid I have no choice but to escort you out. 👋 - Oh you're still here ? Welp I was just joking hehe.`;
        cardImage.src = 'Images/Icons/error.svg';
      }
      break;
    case 10:
      {
        cardTitle.textContent = 'Unacceptable behaviour';
        cardDescription.textContent = `Hope you learned your lesson... 😏 You can't escape me that easily. Welcome back, but next time, maybe think twice before declining those Terms of Service!`;
        cardImage.src = 'Images/Icons/error.svg';
        localStorage.removeItem('banned');
      }
      break;
    case 11:
      {
        cardTitle.textContent = 'Portfolio Skills';
        cardDescription.textContent = `These are Tino's core areas of expertise. Some of these primary skills also encompass secondary abilities, such as database development.`;
        cardImage.src = 'Images/Icons/star.svg';
      }
      break;
    case 12:
      {
        cardTitle.textContent = 'Portfolio Socials';
        cardDescription.textContent = `Whenever Tino feels the need to, he posts stuff about - well everything really. Since he is never online🙄, I have collected his professional insights <red> and casual updates <green> for you here. You will also find some blogs to read.`;
        cardImage.src = 'Images/Icons/follow.svg';
      }
      break;
    case 13:
      {
        cardTitle.textContent = 'HQ Quest checklist';
        cardDescription.textContent = `These tasks will help you get acquainted with Tino and address some personal requests he made. Completing 6 quests unlocks a new level, along with more challenging quests. To view your current level, simply click the <Navigation menu> and select the profile picture in the top left corner. Please make sure to complete all actions directly on this website so I can keep your profile updated. Thank you! 😄`;
        cardImage.src = 'Images/Icons/checklist.svg';
      }
      break;
    default:
      {
        cardTitle.textContent = 'Error Found';
        cardDescription.textContent = `Uhmmmm - something went wrong. What do you mean don't I know ? You are the one pressing things... Okay Okay remain calm, I'm sure if we just close our eyes it will go away.`;
      }
      break;
  }
  passionCard.style.display = 'flex';
  notification.style.display = 'none';
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Task Initialization <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const socialPosts = document.querySelectorAll('.social-post');

function sociaPostClick(e) {
  updateQuestStatus('SocialTask', true);

  socialPosts.forEach((post) => {
    post.removeEventListener('click', sociaPostClick);
  });
}
socialPosts.forEach((socialPost) => {
  socialPost.addEventListener('click', sociaPostClick);
});

const projectCodebtns = document.querySelectorAll('.project-code-btn');

function projectCodeClick(e) {
  updateQuestStatus('ProjectCodeTask', true);

  projectCodebtns.forEach((button) => {
    button.removeEventListener('click', projectCodeClick);
  });
}
projectCodebtns.forEach((button) => {
  button.addEventListener('click', projectCodeClick);
});

const projectSitebtns = document.querySelectorAll('.project-site-btn');

function projectSiteClick(e) {
  updateQuestStatus('ProjectSiteTask', true);

  projectSitebtns.forEach((button) => {
    button.removeEventListener('click', projectSiteClick);
  });
}
projectSitebtns.forEach((button) => {
  button.addEventListener('click', projectSiteClick);
});

const helpBtn = document.getElementById('helpModeBtn');
helpBtn.addEventListener(
  'click',
  () => {
    updateQuestStatus('HelpModeTask', true);
  },
  { once: true }
);
const LinkedInBtn = document.getElementById('LinkedInChecker');
LinkedInBtn.addEventListener(
  'click',
  () => {
    updateQuestStatus('LinkedInTask', true);
  },
  { once: true }
);
const WebsiteBtn = document.getElementById('LikeWebsiteChecker');
WebsiteBtn.addEventListener(
  'click',
  () => {
    updateQuestStatus('LikeWebsiteTask', true);
  },
  { once: true }
);

function hidePopUp() {
  const modalBg = document.getElementById('passionModal');
  const passionCard = document.getElementById('passionCard');

  gsap.to(passionCard, {
    y: '-100%',
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      modalBg.style.display = 'none';
    }
  });
}

function hidePopUp() {
  unlockScreen();
  document.getElementById('passionModal').style.display = 'none';
  document.getElementById('cardTable').style.display = 'none';
}

function showToS() {
  lockScreen();
  document.getElementById('ToS').style.display = 'flex';
}
function toggleHelpMode() {
  let helpers = document.querySelectorAll('.helper');
  let firstHelper = helpers[0];

  let isHidden =
    firstHelper && window.getComputedStyle(firstHelper).display === 'none';

  let displayStyle = isHidden ? 'inline-block' : 'none';
  document.getElementById('helperText').textContent = isHidden
    ? 'Disable Help Mode'
    : 'Enable Help Mode';

  helpers.forEach((helper) => {
    helper.style.display = displayStyle;
  });
}

function toggleCheckList() {
  let checkList = document.getElementById('checkCon');
  checkList.classList.toggle('hidden');
  checkList.classList.toggle('visible');
}

function hideToS(acceptance) {
  if (acceptance) {
    document.getElementById('acceptanceBtns').style.display = 'none';
    document.getElementById('closeToS').style.display = 'block';
    updateQuestStatus('ToSTask', true);
  } else {
    declineToS();
  }
  document.getElementById('ToS').style.display = 'none';
  unlockScreen();
}

let intervalId;
let timeElapsed = 0;
function startCountingTime() {
  const timeElement = document.getElementById('timeSent');

  intervalId = setInterval(() => {
    timeElapsed++;
    timeElement.textContent = `${timeElapsed} minute${
      timeElapsed > 1 ? 's' : ''
    } ago`;
  }, 60000);

  timeElement.textContent = 'Just now';
}

function stopCountingTime() {
  clearInterval(intervalId);
  timeElapsed = 0;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/ Botpress Logic<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

let musicPlayer = document.getElementById('myMusic');

window.addEventListener('message', (event) => {
  if (event.data.action === 'newUser') {
    addNewUser(event.data.firstname, event.data.lastname);
  } else if (event.data.action === 'playMusic') {
    showMusicCard();
    playMusic();
  } else if (event.data.action === 'closeWebchat') {
    document.querySelector('.webchat').style.display = 'none';
    document.querySelector('.webchat-toggle').style.display = 'block';
  }
});

function addNewUser(firstname, lastname) {
  let username = '';
  if (lastname != '') {
    username = `${firstname} ${lastname}`;
  } else {
    username = `${firstname}`;
  }
  localStorage.setItem('username', username);
  document.getElementById('user-name').textContent = `${username}`;
  document.getElementById('card-name').textContent = `${username}`;
  updateQuestStatus('TalktoPassionTask', true);
}
function sendMessageToBot(message) {
  const botIframe = document.querySelector('.webchat iframe');
  if (botIframe) {
    botIframe.contentWindow.postMessage({ action: `${message}` }, '*');
  }
}
function contactMe() {
  openWebchat();
  sendMessageToBot('contactMe');
}
function supportMe() {
  showNotification('Oh, You want to support Tino ...', 8);
}
function declineToS() {
  showNotification('Did you just decline ...', 9);
}

function openWebchat() {
  if (!sentFirst) {
    sentFirst = true;
  }
  document.querySelector('.webchat').style.display = 'block';
  document.querySelector('.webchat-toggle').style.display = 'none';
  sendMessageToBot('openWebchat');
}

function lockScreen() {
  document.documentElement.style.overflowY = 'hidden';
}

function unlockScreen() {
  document.documentElement.style.overflowY = 'auto';
}

const notyf = new Notyf({
  duration: 5000,
  dismissible: true,
  ripple: false,
  position: {
    x: 'right',
    y: 'top'
  },
  types: [
    {
      type: 'success',
      background: '#1a8917',
      icon: {
        className: 'fas fa-check-circle',
        tagName: 'i',
        color: '#0f0'
      }
    },
    {
      type: 'error',
      background: '#e60000',
      className: 'custom-error-notyf',
      icon: {
        className: 'fas fa-exclamation-circle',
        tagName: 'i',
        color: '#ff4c4c'
      }
    },
    {
      type: 'warning',
      background: '#db6300',
      icon: {
        className: 'fas fa-exclamation-triangle',
        tagName: 'i',
        color: 'black'
      }
    }
  ]
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>GSAP animations <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

let programmingLanguages = document.querySelectorAll('.Programming .language');

gsap.utils.toArray(programmingLanguages).forEach((item, index) => {
  gsap.from(item, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: index * 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 95%',
      toggleActions: 'play none none none',
      once: true
    }
  });
});

let projectItems = document.querySelectorAll('.project-item');

gsap.utils.toArray(projectItems).forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });
});

let postLikeCards = document.querySelectorAll('.social-post,.skill-card');

gsap.utils.toArray(postLikeCards).forEach((post, index) => {
  gsap.from(post, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: index * 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: post,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });
});

let socialIcons = document.querySelectorAll('.social-Icon');

gsap.utils.toArray(socialIcons).forEach((icon, index) => {
  gsap.from(icon, {
    opacity: 0,
    x: -50,
    duration: 1,
    delay: index * 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: icon,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });
});

// document.getElementById('tooltipToggle').addEventListener('click', function () {
//   document.querySelector('.menu').classList.toggle('tooltips-visible');
// });

function authenticateGitHub(intent, repoName = null) {
  //Intents specify the action the user wants to undertake # Tino was here 09/04/2025
  const repoOwner = 'Passion-Over-Pain';
  const backendUrl =
    'https://portfolio-backend-pi-three.vercel.app/api/auth/login';

  let url = `${backendUrl}?intent=${encodeURIComponent(intent)}`;

  if (repoName) {
    url += `&repoOwner=${encodeURIComponent(
      repoOwner
    )}&repoName=${encodeURIComponent(repoName)}`;
  }

  window.location.href = url;
}

function starRepository(repoName) {
  authenticateGitHub('star', repoName);
}

function followUser() {
  authenticateGitHub('follow');
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Music Vis <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let fft;
let song;
let particles = [];
let amp = 0;
let playing = false;
let isLoading = false;

// function preload() {
//   song = loadSound(`Audio/Music/Shogun's Shadow Trap.mp3`);
// }

window.onload = function () {
  if (window.p5 && window.p5.prototype && window.p5.prototype.loadSound) {
    song = p5.prototype.loadSound(
      `Audio/Music/Shogun's Shadow Trap.mp3`,
      () => {
        console.log('Sound loaded successfully!');
      }
    );
  } else {
    console.error('p5.sound is not available.');
  }
};

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '1500'); // Above everything that I created but under the music-card
  cnv.style('display', 'none');

  angleMode(DEGREES);
  rectMode(CENTER);

  // Initialize FFT
  fft = new p5.FFT();
  fft.setInput(song);
}

function draw() {
  background(10, 10, 10, 100);
  if (isLoading) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text('Loading...', 50, 50);
    return;
  }

  stroke('#0f0');
  strokeWeight(1.5);
  noFill();

  translate(width / 2, height / 2);

  fft.analyze();
  amp = fft.getEnergy(20, 100);
  let wave = fft.waveform();

  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i < width; i++) {
      let index = floor(map(i, 0, width, 0, wave.length - 1));

      // let r = map(wave[index], -1, 1, 150, 350);
      let r = map(wave[index], -1, 1, 100, 250);
      let x = r * sin(i) * t;
      let y = r * cos(i);
      vertex(x, y);
    }
    endShape();
  }

  let p = new Particle();
  particles.push(p);
  for (let i = particles.length - 1; i >= 0; --i) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230);
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(200);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0003));
    this.w = random(3, 5);
  }

  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }

  edges() {
    return (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    );
  }

  show() {
    noStroke();
    fill('#0f0');
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Music Functionality <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let songs = [];
let clickedMusic = false;
let currentSongIndex = 0;
let audioPlayer = document.getElementById('myMusic');
const titleElement = document.querySelector('.title-1');
const artistElement = document.querySelector('.title-2');
const elapsedTimeElement = document.querySelector('.music-time_now');
const fullTimeElement = document.querySelector('.music-time_full');
const musicProgressBar = document.querySelector('.music-elapsed');
const volumeSlider = document.querySelector('.music-volume .slider .green');
const playButton = document.querySelector(
  ".music-controls img[src*='play.svg']"
);
const nextButton = document.querySelector(
  ".music-controls img[src*='next.svg']"
);
const prevButton = document.querySelector(
  ".music-controls img[src*='previous.svg']"
);
const closeButton = document.querySelector(
  ".music-controls img[src*='close.svg']"
);
const volumeButton = document.querySelector('.music-volume_button');

let isMuted = false;

volumeButton.addEventListener('click', () => {
  isMuted = !isMuted;
  song.setVolume(isMuted ? 0 : 1);
  volumeButton.src = isMuted
    ? 'Images/Icons/mute.svg'
    : 'Images/Icons/volume.svg';
});

async function loadSongs() {
  try {
    const response = await fetch('songs.json');
    songs = await response.json();
    loadSong(0);
  } catch (error) {
    notyf.error(`${error}`);
  }
}

function loadSong(index) {
  toggleMusicAnimation(false);
  if (index < 0 || index >= songs.length) return;
  currentSongIndex = index;
  const localsong = songs[currentSongIndex];
  isLoading = false;

  audioPlayer.src = localsong.src;
  titleElement.textContent = localsong.title;
  artistElement.textContent = localsong.artist;

  musicProgressBar.style.width = '0%';
  elapsedTimeElement.textContent = '0:00';

  if (song) {
    song.stop();
  }

  song = loadSound(localsong.src, () => {
    fullTimeElement.textContent = formatTime(song.duration());

    fft.setInput(song);
    isLoading = false;
    playButton.disabled = false;

    if (clickedMusic) {
      playMusic();
    } else {
      notyf.success(`First song loaded. Music ready to play.`);
    }
  });

  playButton.disabled = true;
  playing = false;
  playButton.src = 'Images/Icons/play.svg';
}

function togglePlay() {
  if (!playing) {
    playMusic();
  } else {
    pauseMusic();
  }
}
function toggleMusicAnimation(play) {
  const elements = document.querySelectorAll('.music-greenline');
  elements.forEach((el) => {
    el.style.animationPlayState = play ? 'running' : 'paused';
  });
}
function playMusic() {
  if (!song) {
    notyf.error('No song loaded.');
    return;
  }

  if (!song.isLoaded()) {
    notyf.error('Song is still loading. Please wait...');
    return;
  }

  if (!song.isPlaying()) {
    song.play();
    playing = true;
    playButton.src = 'Images/Icons/pause.svg';
    toggleMusicAnimation(true);
    updateQuestStatus('MusicTask', true);
    clickedMusic = true;
  }
}

function pauseMusic() {
  if (song && song.isPlaying()) {
    song.pause();
    playing = false;
    playButton.src = 'Images/Icons/play.svg';
    toggleMusicAnimation(false);
  }
}

function nextSong() {
  clickedMusic = true;
  toggleMusicAnimation(false);
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  song.onloadedmetadata = () => playMusic();
}

function prevSong() {
  clickedMusic = true; // Make this more efficient
  toggleMusicAnimation(false);
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  song.onloadedmetadata = () => playMusic();
}

// Progress Bar Updates
function updateMusicProgressBar() {
  if (song && song.isPlaying()) {
    const currentTime = song.currentTime();
    const duration = song.duration();

    elapsedTimeElement.textContent = formatTime(currentTime);

    if (duration) {
      const progressPercent = (currentTime / duration) * 100;
      musicProgressBar.style.width = `${progressPercent}%`;
    }
  }
}

// Click to Seek Song Position
document.querySelector('.music-time').addEventListener('click', (event) => {
  if (!song) return;

  const musicProgressBarWidth = event.currentTarget.offsetWidth;
  const clickX = event.offsetX;
  const duration = song.duration();

  if (duration) {
    song.jump((clickX / musicProgressBarWidth) * duration);
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function hideMusicCard() {
  gsap.to('#musicCard', {
    duration: 0.5,
    opacity: 0,
    scale: 0.9,
    ease: 'power2.in',
    onComplete: () => {
      document.getElementById('musicCard').style.display = 'none'; // Hide music card after animation
    }
  });

  gsap.to('#musicToggle', {
    duration: 0.5,
    opacity: 1,
    scale: 1,
    ease: 'power2.out',
    onStart: () => {
      document.getElementById('musicToggle').style.display = 'block'; // Show toggle before animation
    }
  });
}

playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

setInterval(updateMusicProgressBar, 1000);

// // Load First Song
// loadSongs();
window.onload = function () {
  loadSongs();
};

function toggleVisualizer() {
  let cnv = document.querySelector('canvas'); // Get the canvas element
  if (cnv.style.display === 'none') {
    cnv.style.display = 'block';
    lockScreen();
  } else {
    cnv.style.display = 'none';
    unlockScreen();
  }
}

function showMusicCard() {
  gsap.to('#musicCard', {
    duration: 0.5,
    opacity: 1,
    scale: 1,
    display: 'block',
    ease: 'power2.out'
  });

  gsap.to('#musicToggle', {
    duration: 0.5,
    opacity: 0,
    scale: 0.5,
    ease: 'power2.out',
    onComplete: () => {
      document.getElementById('musicToggle').style.display = 'none';
    }
  });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Story Functionality<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//USE THIS:
const stories = {
  professional: [
    {
      type: 'text',
      content: 'Professional Statuses will appear here😄',
      duration: 5000,
      background: '#001908'
    },
    {
      type: 'text',
      content: 'My Portfolio Trailer 👉🏿',
      duration: 5000,
      background: '#001908'
    },

    { type: 'video', src: 'Images/Portfolio-Trailer.mp4', duration: 107000 }
  ],
  casual: [
    {
      type: 'text',
      content: 'Personal Statuses will appear here😎',
      duration: 5000,
      background: '#001908'
    }
  ]
};

const storyIcons = document.querySelectorAll('.story-icon');
const storyViewer = document.querySelector('.story-viewer');
const storyProgressBar = document.querySelector('.story-progress-bar');
const storyContent = document.querySelector('.story-content');
const closeStoryBtn = document.querySelector('.close-story');

let storyQueue = [];
let storyIndex = 0;
let isPaused = false;
let currentVideo = null;
let currentProgress = 0;
let progressStartTime = 0;
let progressDuration = 0;
let animationFrameId = null;
let videoLoaded = false;

// Start a story when an icon is clicked
storyIcons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    const storyType = e.target.dataset.story;
    storyQueue = stories[storyType];
    if (storyType == 'professional') {
      updateQuestStatus('ProStatusTask', true);
    } else {
      updateQuestStatus('CasStatusTask', true);
    }
    storyIndex = 0;
    showStory();
  });
});

// Close the story when the close button is clicked
closeStoryBtn.addEventListener('click', hideStory);

// Pause/resume on mouse or touch events
storyViewer.addEventListener('mousedown', pauseStory);
storyViewer.addEventListener('mouseup', resumeStory);
storyViewer.addEventListener('touchstart', pauseStory);
storyViewer.addEventListener('touchend', resumeStory);

function hideStory() {
  unlockScreen();
  storyViewer.classList.add('hidden');
  stopAllMedia();
}

function showStory() {
  currentProgress = 0;
  progressDuration = 0;
  isPaused = false;
  cancelAnimationFrame(animationFrameId);

  if (storyIndex >= storyQueue.length) {
    unlockScreen();
    storyViewer.classList.add('hidden');
    stopAllMedia();
    return;
  }

  lockScreen();
  storyViewer.classList.remove('hidden');
  storyContent.innerHTML = '';

  const currentStory = storyQueue[storyIndex];

  if (currentStory.type === 'image') {
    const img = document.createElement('img');
    img.src = currentStory.src;
    img.style.width = '100vw';
    img.style.height = '100vh';
    img.style.objectFit = 'cover';
    storyContent.appendChild(img);
    progressDuration = currentStory.duration;
    startStoryProgressBar();
  } else if (currentStory.type === 'video') {
    const video = document.createElement('video');
    video.className = 'video-js vjs-default-skin';
    video.src = currentStory.src;
    video.autoplay = true;
    video.controls = false;
    video.style.width = '100vw';
    video.style.height = '100vh';
    video.style.objectFit = 'cover';
    const loadingText = document.createElement('p');
    loadingText.innerText = 'Loading video...';
    loadingText.classList.add('loading-message');
    loadingText.style.position = 'absolute';
    loadingText.style.top = '50%';
    loadingText.style.left = '50%';
    loadingText.style.transform = 'translate(-50%, -50%)';
    loadingText.style.fontSize = '20px';
    loadingText.style.color = 'white';
    storyContent.appendChild(loadingText);

    currentVideo = video;
    storyContent.appendChild(video);

    progressDuration = currentStory.duration;

    // Handle when the video is ready to play
    video.addEventListener(
      'canplay',
      () => {
        // Remove loading message once the video is ready
        loadingText.remove();

        // Start progress bar
        startStoryProgressBar();
      },
      { once: true }
    );

    video.addEventListener('ended', nextStory, { once: true });
  } else if (currentStory.type === 'text') {
    const textElement = document.createElement('p');
    textElement.innerText = currentStory.content;
    textElement.style.fontSize = '24px';
    textElement.style.color = 'white';
    textElement.style.display = 'flex';
    textElement.style.justifyContent = 'center';
    textElement.style.alignItems = 'center';
    textElement.style.width = '100vw';
    textElement.style.height = '100vh';
    textElement.style.textAlign = 'center';
    textElement.style.backgroundColor = currentStory.background;
    storyContent.appendChild(textElement);
    progressDuration = currentStory.duration;
    startStoryProgressBar();
  }
}

function showLoadingMessage() {
  const loadingText = document.createElement('p');
  loadingText.innerText = 'Loading...';
  loadingText.classList.add('loading-message');
  loadingText.style.position = 'absolute';
  loadingText.style.top = '50%';
  loadingText.style.left = '50%';
  loadingText.style.transform = 'translate(-50%, -50%)';
  loadingText.style.fontSize = '20px';
  loadingText.style.color = 'white';
  storyContent.appendChild(loadingText);
}

function removeLoadingMessage() {
  const loadingText = document.querySelector('.loading-message');
  if (loadingText) {
    loadingText.remove();
  }
}

function startStoryProgressBar() {
  // Initialize the progress start time, accounting for any previous progress (e.g., resume)
  progressStartTime = Date.now() - currentProgress;
  animationFrameId = requestAnimationFrame(updateStoryProgressBar);
}

function updateStoryProgressBar() {
  if (isPaused) return; // If paused, exit and wait for resume

  const elapsedTime = Date.now() - progressStartTime;
  currentProgress = Math.min(elapsedTime, progressDuration);
  storyProgressBar.style.width = `${
    (currentProgress / progressDuration) * 100
  }%`;

  if (currentProgress < progressDuration) {
    animationFrameId = requestAnimationFrame(updateStoryProgressBar);
  } else {
    nextStory();
  }
}

function nextStory() {
  cancelAnimationFrame(animationFrameId);
  currentProgress = 0;
  storyIndex++;
  showStory();
}

function pauseStory() {
  isPaused = true;
  if (currentVideo) currentVideo.pause();
  cancelAnimationFrame(animationFrameId);
}

function resumeStory() {
  if (!isPaused) return;
  isPaused = false;
  if (currentVideo) currentVideo.play();
  // Adjust the start time so the progress resumes correctly
  progressStartTime = Date.now() - currentProgress;
  animationFrameId = requestAnimationFrame(updateStoryProgressBar);
}

function stopAllMedia() {
  if (currentVideo) {
    currentVideo.pause();
    currentVideo.currentTime = 0;
    currentVideo = null;
  }
  cancelAnimationFrame(animationFrameId);
  currentProgress = 0;
}
gsap.from('#passionCard', {
  scaleY: 0,
  transformOrigin: 'top center',
  duration: 0.6,
  ease: 'power2.out'
});

// Add scroll logging for debugging
window.addEventListener('scroll', () => {
  console.log('Scroll position:', window.scrollY);
});

// Preserve scroll position on resize (for dev tools mobile switch)
let scrollPos = 0;
window.addEventListener('resize', () => {
  scrollPos = window.scrollY;
  setTimeout(() => {
    window.scrollTo(0, scrollPos);
  }, 100);
});
