/* TODO: ALTERAR AQUI - Conecte o formulário a um serviço de envio, se desejar receber mensagens. */
// Navegação mobile com suporte a teclado e leitores de tela.
const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('#main-menu');

if (menuToggle && mainMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  mainMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#nome');
    const email = document.querySelector('#email');
    const message = document.querySelector('#mensagem');
    const formStatus = document.querySelector('.form-status');
    const fields = [name, email, message];
    let isValid = true;

    fields.forEach((field) => {
      const fieldContainer = field.closest('.field');
      const error = fieldContainer.querySelector('.field-error');
      fieldContainer.classList.remove('invalid');
      error.textContent = '';

      if (!field.value.trim()) {
        fieldContainer.classList.add('invalid');
        error.textContent = 'Este campo é obrigatório.';
        isValid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        fieldContainer.classList.add('invalid');
        error.textContent = 'Digite um e-mail válido.';
        isValid = false;
      }
    });

    if (isValid) {
      formStatus.textContent = 'Mensagem validada! Conecte este formulário a um serviço de envio para recebê-la.';
      contactForm.reset();
    } else {
      formStatus.textContent = 'Revise os campos destacados.';
    }
  });
}

/* TODO: ALTERAR AQUI - Personalize as demonstrações ou conecte-as aos seus projetos reais. */
const imcButton = document.querySelector('#calcular-imc');
if (imcButton) {
  imcButton.addEventListener('click', () => {
    const weight = Number(document.querySelector('#peso').value);
    const height = Number(document.querySelector('#altura').value);
    const result = document.querySelector('#resultado-imc');

    if (!weight || !height || weight <= 0 || height <= 0) {
      result.textContent = 'Preencha peso e altura com valores válidos.';
      return;
    }

    const bmi = weight / (height * height);
    const classification = bmi < 18.5 ? 'abaixo do peso' : bmi < 25 ? 'na faixa adequada' : bmi < 30 ? 'acima do peso' : 'na faixa de obesidade';
    result.textContent = `Seu IMC é ${bmi.toFixed(2)}: ${classification}.`;
  });
}

const taskInput = document.querySelector('#nova-tarefa');
const addTaskButton = document.querySelector('#adicionar-tarefa');
const taskList = document.querySelector('#lista-tarefas');
if (taskInput && addTaskButton && taskList) {
  const storedTasks = JSON.parse(localStorage.getItem('yasmin-tarefas') || '[]');

  const renderTasks = () => {
    taskList.innerHTML = '';
    storedTasks.forEach((task, index) => {
      const item = document.createElement('li');
      item.innerHTML = `<span>${task}</span><button type="button" aria-label="Remover tarefa">Remover</button>`;
      item.querySelector('button').addEventListener('click', () => {
        storedTasks.splice(index, 1);
        localStorage.setItem('yasmin-tarefas', JSON.stringify(storedTasks));
        renderTasks();
      });
      taskList.appendChild(item);
    });
  };

  addTaskButton.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (!task) return;
    storedTasks.push(task);
    localStorage.setItem('yasmin-tarefas', JSON.stringify(storedTasks));
    taskInput.value = '';
    renderTasks();
  });
  renderTasks();
}

const petAction = document.querySelector('#agendar-pet');
if (petAction) {
  petAction.addEventListener('click', (event) => {
    event.preventDefault();
    const status = document.querySelector('#pet-status');
    status.hidden = false;
  });
}