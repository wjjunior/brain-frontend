const pt_BR_LOCALE: NestedLocale = {
  auth: {
    login: {
      title: 'Informe seus dados abaixo',
      emailFieldPlaceholder: 'Digite seu e-mail',
      usernameFieldPlaceholder: 'Digite seu nome de usuário(a)',
      passwordFieldPlaceholder: 'Digite sua senha',
      accessButton: 'Acessar a plataforma',
      forgotPassword: 'Esqueceu a senha?',
      emailFieldLabel: 'E-mail',
      usernameFieldLabel: 'Nome de usuário(a)',
      passwordFieldLabel: 'Senha',
      authFailed:
        'Autenticação falhou: por favor, confira seu nome de usuário e senha.',
      validation: {
        usernameMinLength:
          'O nome de usuário(a) precisa ter no mínimo 3 caracteres.',
        passwordMinLength: 'A senha precisa ter no mínimo 8 caracteres.',
      },
    },
    forgotPassword: {
      title: 'Recuperar senha',
      instructions:
        'Para recuperar sua senha, digite abaixo o e-mail que você usa para acessar a Brain.',
      registeredEmail: 'E-mail cadastrado',
      registeredEmailPlaceholder: 'Digite seu e-mail',
      recoverPassword: 'Recuperar a senha',
      cancelRecovery: 'Cancelar',
    },
    resetSent: {
      title: 'E-mail enviado',
      linkWasSent:
        'Enviamos um link para você recuperar a senha no: {emailAddress}',
      troubleshootingTitle: 'Não recebeu o e-mail?',
      troubleshootingInstructions:
        'Confira sua caixa de Spam. Se também não estiver lá, solicite o link novamente ou entre em contato com o nosso Suporte',
      resendLink: 'Reenviar link',
      goToLogin: 'Voltar para a tela de acesso',
    },
    loadUserFailed: 'Não foi possível carregar suas informações.',
    recoveryDetails:
      'Enviaremos um e-mail com as instruções. Se você não utiliza mais o e-mail cadastrado na Brain, fale com o nosso Suporte para acessar sua conta.',
    recoverPasswordFailed: 'Falha ao recuperar a senha.',
  },
  footer: {
    support: 'Suporte',
    adminAccess: 'Acesso administrativo',
    copyright: 'BRAIN Software © 2020. Todos direitos reservados a Nexus.',
  },
  errors: {
    notFound: {
      title: 'Ops! A página não foi encontrada.',
      subtitle: 'A página que você solicitou não foi encontrada.',
      goToHome: 'Ir para o início',
    },
    internalError: {
      title: 'Ops! Identificamos um erro.',
      subtitle: 'Retorne para o início.',
      goToHome: 'Ir para o início',
    },
    serverError: {
      title: 'Ops! Ocorreu um erro.',
    },
    badRequest: {
      title: 'Ops! Erro na requisição.',
    },
  },
  common: {
    yes: 'Sim',
    no: 'Não',
    ok: 'Ok!',
    oops: 'Ops!',
    uhh: 'Epa..',
    hey: 'Ei!',
    viewFile: 'Visualizar relatório',
    upgradePlan: 'Contratar novo plano',
    search: 'Buscar',
    searchPlaceholder: 'Realize uma busca',
    saveSelection: 'Salvar seleção',
    selectedItems: '{number} selecionados',
    code: 'Código do preenchimento',
    cleanSelectedItems: 'Deselecionar todos',
    fourOrMore: '4 ou mais',
    helpCenter: 'Central de ajuda',
    icdCode: 'CID-{icdCode}',
    nextStep: 'Avançar',
    previousStep: 'Voltar',
    saveRecord: 'Salvar ficha',
    name: 'Nome',
    date: 'Data',
    hour: 'Hora',
    options: 'Opções',
    type: 'Tipo',
    id: 'ID',
    openRecord: 'Acessar ficha',
    createAnalysis: 'Criar análise',
    fillDate: 'Data do preenchimento',
    generalInfo: 'Informações gerais',
    patientNotSelected: 'Você ainda precisa selecionar um(a) paciente..',
    diagnosticNotSelected:
      'Você ainda precisa selecionar um diagnóstico do(a) paciente..',
    patient: 'Paciente',
    resetFilters: 'Limpar filtros',
    documents: {
      cpf: 'CPF',
      id: 'RG',
      passport: 'Passaporte',
    },
    analysis: {
      coreSet: 'CIF CoreSet',
      globalPrognostic: 'Prognóstico global',
      neuropsichologicalProfile: 'Perfil neuropsicológico',
      prospectiveResultMap: 'Mapa prospectivo de resultados',
      interventionGoals: 'Metas para intervenção',
      healthImpact: 'Impactos na condição de saúde',
      items: 'Itens',
      coreSetTypes: {
        ave: '(AVE) Acidente Vascular Encefálico (Completo)',
        tce: '(TCE) Trauma Crânio Encefálico (Resumido)',
        dem: 'Demência',
        tdah: 'TDAH Comum (Completo)',
      },
      coreSetDescriptions: {
        'FUNÇÕES DO CORPO':
          'Funções fisiológicas dos sistemas do corpo (incluindo funções psicológicas)',
        'ESTRUTURAS DO CORPO':
          'Partes anatômicas do corpo como órgãos, extrremidades e seus componentes. Quanto de comprometimento a pessoa tem em...',
        'FATORES AMBIENTAIS':
          'Compõem o ambiente físico, social e atitudinal,  em que as pessoas vivem e conduzem as suas vidas. {linebreak}{linebreak}Quanto de um facilitador ou barreira a pessoa experimenta em relação a ... {linebreak}Você também pode classificar os fatores ambientais como facilitador ou barreira, se aplicável.',
        'ATIVIDADES E PARTICIPAÇÃO':
          'Execução de uma tarefa ou ação por um indivíduo em uma situação de vida.{linebreak}{linebreak}Quanto de dificuldade a pessoa tem em ...{linebreak}D: Desempenho em ...{linebreak}C: Capacidade de ...',
      },
      coreSetCategories: {
        bodyFunctions: 'Funções do corpo',
        bodyFunctionsDescription:
          'Funções fisiológicas dos sistemas do corpo (incluindo funções psicológicas)',
        bodyStructures: 'Estruturas corporais',
        bodyStructuresDescription:
          'Partes anatômicas do corpo como órgãos, extrremidades e seus componentes. Quanto de comprometimento a pessoa tem em...',
        environmentalFactors: 'Fatores Ambientais',
        environmentalFactorsDescription:
          'Compõem o ambiente físico, social e atitudinal,  em que as pessoas vivem e conduzem as suas vidas. {linebreak}{linebreak}Quanto de um facilitador ou barreira a pessoa experimenta em relação a ... {linebreak}Você também pode classificar os fatores ambientais como facilitador ou barreira, se aplicável.',
        activitiesAndParticipation: 'Atividades e Participação',
        activitiesAndParticipationDescription:
          'Execução de uma tarefa ou ação por um indivíduo em uma situação de vida.{linebreak}{linebreak}Quanto de dificuldade a pessoa tem em ...{linebreak}D: Desempenho em ...{linebreak}C: Capacidade de ...',
      },
    },
    ageRanges: {
      children: 'Criança',
      young: 'Jovem',
      adult: 'Adulto',
      elder: 'Idoso',
    },
    ageRangesSuffix: '({from} a {to} anos)',
    genders: {
      1: 'Masculino',
      2: 'Feminino',
      // 3: 'Outros',
    },
    maritalStatuses: {
      single: 'Solteiro(a)',
      married: 'Casado(a)',
      divorced: 'Divorciado(a)',
      widow: 'Viúvo(a)',
      separated: 'Separado(a)',
    },
    manualPreferences: {
      leftHanded: 'Canhoto',
      rightHanded: 'Destro',
      ambidextrous: 'Ambidestro',
    },
    physicalActivityLevels: {
      no: 'Sedentário',
      yes: 'Atividade regular',
      sedentary: 'Sedentário',
      irregularlyActive: 'Irregularmente ativo',
      active: 'Ativo',
      veryActive: 'Muito ativo',
    },
    countries: {
      brazil: 'Brasil',
    },
    states: {
      RO: 'Rondônia',
      AC: 'Acre',
      AM: 'Amazonas',
      RR: 'Roraima',
      PA: 'Pará',
      AP: 'Amapá',
      TO: 'Tocantins',
      MA: 'Maranhão',
      PI: 'Piauí',
      CE: 'Ceará',
      RN: 'Rio Grande do Norte',
      PB: 'Paraíba',
      PE: 'Pernambuco',
      AL: 'Alagoas',
      SE: 'Sergipe',
      BA: 'Bahia',
      MG: 'Minas Gerais',
      ES: 'Espírito Santo',
      RJ: 'Rio de Janeiro',
      SP: 'São Paulo',
      PR: 'Paraná',
      SC: 'Santa Catarina',
      RS: 'Rio Grande do Sul',
      MS: 'Mato Grosso do Sul',
      MT: 'Mato Grosso',
      GO: 'Goiás',
      DF: 'Distrito Federal',
    },
    educationLevels: {
      'middle-school-incomplete': 'Ensino Fundamental incompleto',
      'middle-school-complete': 'Ensino Fundamental completo',
      'high-school-incomplete': 'Ensino Médio incompleto',
      'high-school-complete': 'Ensino Médio completo',
      'bachelors-degree-incomplete': 'Ensino Superior incompleto',
      'bachelors-degree-complete': 'Ensino Superior completo',
      'masters-degree-incomplete': 'Pós-graduação (nível mestrado) incompleto',
      'masters-degree-complete': 'Pós-graduação (nível mestrado) completo',
      'doctorate-degree-incomplete': 'Pós-graduação (nível doutor) incompleto',
      'doctorate-degree-complete': 'Pós-graduação (nível doutor) completo',
    },
    enableEdit: 'Habilitar Edição',
  },
  userMenu: {
    myAccount: 'Meu perfil',
    myPlans: 'Meu plano',
    signOut: 'Sair',
  },
  sideMenu: {
    dashboardHome: 'Início',
    patientsHome: 'Pacientes',
    analysisHome: 'Análises',
    otherPlans: 'Outros planos',
  },
  dashboard: {
    greeting: 'Olá, {fullName}.',
    description: 'Veja as informações de suas consultas.',
    patientsSummaryTitle: 'Total de pacientes',
    analysisSummaryTitle: 'Total de análises',
    ageRangeTitle: 'Faixa etaria mais atendida',
    genderSummaryTitle: 'Gêneros',
    appointmentsTotalTitle: 'Total de antedimentos',
    maleLabel: 'Masculino',
    femaleLabel: 'Feminino',
    achievedGoalsLabel: 'Metas alcançadas',
    unachievedGoalsLabel: 'Metas não alcançadas',
    legendValue: '{total} ({percentage}%)',
    latestAnalysisTitle: 'Últimas análises realizadas',
    icdRankingsTitle: 'CID mais atendidos',
    icdRankingTotalPatients: 'Total de pacientes: {totalPatients}',
    coreSetRankingsTitle: 'CIF CoreSet mais preenchidos',
    coreSetRankingTotalRecords: 'Total preenchido: {totalRecords}',
    compromisedCategoryScore: 'Total de pontuação: {score}',
    compromisedCategoriesTitle: 'Categorias mais comprometidas',
    goalsSummaryTitle: 'Desempenho das metas',
    goalsInProgressTitle: 'Metas em andamento',
    patientName: 'Paciente: {patientName}',
    lastXDays: 'Últimos {days} dias',
    selectDateRange: 'Selecione um filtro de data',
  },
  patients: {
    title: 'Pacientes',
    description: 'Cadastre e veja informações sobre os seus pacientes.',
    createPatient: 'Novo paciente',
    searchPatientLabel: 'Buscar paciente',
    searchPatientPlaceholder: 'Digite o nome do(a) paciente',
    dateRangeLabel: 'Período',
    dateRangePlaceholder: 'Selecione o período',
    dateRangeInvalid: 'O período selecionado é invalido',
    patientTotalGoals: 'Total de metas',
    patientGoalsInProgress: 'Metas em andamento',
    patientTotalAnalysis: 'Total de análises',
    newPatientTitle: 'Nova ficha de paciente',
    newPatientDescription:
      'Para criar a ficha de paciente é necessário inserir algumas informações.',
    personalInfoTitle: 'Informações pessoais',
    clinicalInfoTitle: 'Informações clínicas',
    healthImpactsTitle: 'Impactos da condição de saúde',
    coreSetsTitle: 'CIF CoreSet',
    goalsTitle: 'Metas para intervenção',
    prospectiveResultMapsTitle: 'Mapa prospectivo',
    globalPrognosticsTitle: 'Prognóstico global',
    neuropsichologicalProfilesTitle: 'Perfil neuropsicológico',
    emptyListTitle: 'Ops! Não encontramos nenhum(a) paciente.',
    emptyListSubtitle: 'Aproveite para criar um(a) agora mesmo!',
    editPatientSuccess: 'As informações do(a) paciente foram alteradas.',
    editPatientFailed: 'Não foi possível salvar as informações do(a) paciente.',
    createPatientSuccess: 'Paciente registrado(a) com sucesso!',
    createPatientFailed: 'Não foi possível registrar o/a paciente.',
    personalInfo: {
      invalidFields: 'Por favor corrija os campos inválidos.',
      validation: {
        invalidCity: 'Digite um nome válido de cidade.',
        invalidAddress: 'Digite um endereço válido.',
        invalidZipcode: 'Digite um CEP válido.',
        invalidPhoneNumber: 'Digite um número de telefone válido.',
        invalidProfession: 'Digite uma profissão válida.',
        invalidEmail: 'Digite um e-mail válido.',
        minDocumentNumberLength: 'Digite um número de documento válido.',
        fullNameMinLength: 'Digite um nome válido.',
        usernameSpaces: 'Digite um nome completo.',
        nothingSelected: 'Selecione uma opção.',
        invalidBirthDate: 'Selecione uma data de nascimento válida.',
        noSocialEconomicLevel: 'Preencha o formulário sócio econômico.',
      },
      fullNamePlaceholder: 'Digite o nome completo',
      fullNameLabel: 'Nome completo',
      idDocumentTypePlaceholder: 'Selecione o documento de identificação',
      idDocumentTypeLabel: 'Documento de identificação',
      idDocumentNumberPlaceholder:
        'Digite o número do documento de identificação',
      idDocumentNumberLabel: 'Número do documento de identificação',
      birthDatePlaceholder: 'Ex.: 01/01/1990',
      birthDateLabel: 'Data de nascimento',
      ageRangePlaceholder: 'Faixa etária do(a) paciente',
      ageRangeLabel: 'Faixa etária',
      educationPlaceholder: 'Selecione a escolaridade do(a) paciente',
      educationLevel: 'Escolaridade',
      professionPlaceholder: 'Digite a profissão do(a) paciente',
      professionLabel: 'Profissão',
      socialEconomicLevelPlaceholder:
        '{link} para preencher o Questionário Critério Brasil',
      socialEconomicLevelClickHere: 'Clique aqui',
      socialEconomicLevelLabel: 'Nível sócio econômico',
      phoneNumberPlaceholder: 'Digite o número para contato',
      phoneNumberLabel: 'Número para contato',
      emailPlaceholder: 'Digite o e-mail',
      emailLabel: 'E-mail',
      maritalStatusPlaceholder: 'Selecione o estado civil',
      maritalStatusLabel: 'Estado civil',
      genderPlaceholder: 'Selecione o gênero',
      genderLabel: 'Gênero',
      zipcodePlaceholder: 'Digite o CEP',
      zipcodeLabel: 'CEP',
      addressPlaceholder: 'Digite o endereço',
      addressLabel: 'Endereço',
      cityPlaceholder: 'Selecione a cidade',
      cityLabel: 'Cidade',
      stateOrProvincePlaceholder: 'Selecione o estado',
      stateOrProvinceLabel: 'Estado',
      countryPlaceholder: 'Selecione o país',
      countryLabel: 'País',
      submitSocialEconomicForm: 'Finalizar formulário',
      currentSocialEconomicLevel: 'Nível atual: {level}',
      socialEconomicQuestions: {
        title: 'Questionário para classificação econômica do paciente',
        assetsPrefix: 'Quantos(as) {asset}?',
        assets: {
          bathrooms: 'Banheiros',
          housekeepers: 'Empregados(as) doméstico',
          cars: 'Automóveis',
          computers: 'Microcomputadores',
          dishwashers: 'Lava louças',
          washingMachine: 'Lava roupa',
          fridges: 'Geladeiras',
          freezer: 'Freezers',
          dvd: 'DVDs',
          microwave: 'Microondas',
          motorcycle: 'Motocicletas',
          clothesDryer: 'Secadoras de roupa',
        },
        educationLevelQuestion: 'Qual a escolaridade?',
        educationLevel: {
          illiterateOrMiddleSchoolOneIncomplete:
            'Analfabeto / Fundamental I incompleto',
          middleSchoolTwoIncomplete:
            'Fundamental I completo / Fundamental II incompleto',
          highSchoolIncomplete: 'Fundamental II completo / Médio incompleto',
          bachelorsIncomplete: 'Médio completo / Superior incompleto',
          bachelorsComplete: 'Superior completo',
        },
        publicServicesPrefix: 'Tem {service}?',
        publicServices: {
          pipedWater: 'Água encanada',
          pavedStreets: 'Rua pavimentada',
        },
      },
    },
    clinicalInfo: {
      manualPreferencePlaceholder: 'Selecione a preferência manual',
      manualPreferenceLabel: 'Preferência manual',
      icdCodesSearchPlaceholder: 'Busque por nome',
      icdCodesPlaceholder: 'Selecione o(s) código(s) da CID',
      icdCodesLabel: 'Código(s) da CID',
      diagnosisPlaceholder: 'Descreva um diagnóstico prévio do(a) paciente',
      diagnosisLabel: 'Diagnóstico',
      cognitiveEmotionalBehaviourComplaintsPlaceholder:
        'Descreva uma queixa prévia do(a) paciente',
      cognitiveEmotionalBehaviourComplaintsLabel:
        'Queixas principais relacionadas aos déficits cognitivos, emocionais e comportamentais',
      performanceCapacityPlaceholder:
        'Descreva uma queixa prévia do(a) paciente',
      performanceCapacityLevel:
        'Queixas principais relacionadas ao desempenho e a capacidade nas atividades do dia a dia do(a) paciente',
      encephalicInjuryDatePlaceholder: 'Selecione a data',
      encephalicInjuryDateLabel:
        'Data de início do transtorno ou da da lesão encefálica',
      encephalicInjuryNotInformedLabel:
        'Transtorno ou ocorrência de lesão encefálica:',
      caseHistoryLabel: 'É um caso de:',
      caseHistoryPlaceholder: 'Selecione o tipo de caso',
      caseOfOptions: {
        psychiatricDisorder: 'Transtorno psiquiátrico',
        encephalicInjury: 'Lesão encefálica adquirida',
        both: 'Ambos',
      },
      hospitalizationsCountLabel: 'Número de hospitalizações',
      physicalActivityStatusPlaceholder: 'Selecione a classificação',
      physicalActivityStatusLabel: 'Atividade física',
      familyHistoryPlaceholder: 'Descreva o histórico familiar do(a) paciente',
      familyHistoryLabel: 'Histórico familiar',
      additionalInfoPlaceholder:
        'Descreva quaisquer informações adicionais do(a) paciente',
      additionalInfoLabel: 'Informações adicionais',
      clinicalHistoryTitle: 'Histório clínico',
    },
  },
  analysis: {
    facilitator: 'Facilitador',
    barrier: 'Barreira',
    selectDiagnostic: 'Selecione o diagnóstico prévio',
    title: 'Análises',
    reportsTitle: 'Relatórios',
    description: 'Crie diversas análises em tudo só um lugar',
    emptyListTitle: 'Ops! Não encontramos nenhuma análise.',
    emptyListSubtitle: 'Aproveite para criar uma agora mesmo!',
    selectAnalysisTypePlaceholder: 'Selecione o tipo do análise',
    selectPatientPlaceholder: 'Selecione o paciente',
    createAnalysis: 'Nova análise',
    typeSelectionTitle: 'Escolha a análise',
    choosePatient: 'Escolha um(a) paciente',
    selectCoreSetPlaceholder: 'Selecione o diagnóstico',
    outsideYourPlan: 'O seu plano não disponibiliza essa funcionalidade',
    choosePatientDescription:
      'Para criar um diagnóstico é necessário vincular a um(a) paciente. Selecione, abaixo, o(a) paciente.',
    finishAndSave: 'Finalizar e salvar',
    createPatientIfNeeded:
      'Caso necessite criar uma nova ficha do paciente, você poderá {link}.',
    clickHere: 'clicar aqui',
    selectPacientPlaceholder: 'Selecione um(a) paciente',
    searchByName: 'Busque por nome',
    generateAndSave: 'Gerar relatório e salvar',
    coreSet: {
      title: 'Coreset da CIF',
      description: 'Preenchimento do coreset da CIF',
      configureForm: 'Configure o formulário',
      fillForm: 'Preencher formulário',
      configureFormDescription:
        'Realize a configuração para gerar o formulário. Observe bem todas as informações antes de gerar.',
      selectCategory: '1. Selecione o CoreSet',
      selectCategoryPlaceholder: 'Selecione o conjunto',
      fillFormTitle: 'Preencher formulário baseado em CIF',
      problemDescriptionLabel: 'Descrição do problema',
      problemDescriptionPlaceholder: 'Digite aqui a descrição do problema',
      informationSources: 'Fontes de informação',
      formEmpty: 'Você ainda precisa preencher o CoreSet..',
      coreSetNotSelected: 'Você ainda precisa selecionar um CoreSet..',
      coreSetNotFilled: 'Você ainda precisa preencher o CoreSet..',
      coreSetCreationFailed: 'Não foi possível registrar o CoreSet.',
      coreSetCreationSuccess: 'O CoreSet foi preenchido com sucesso!',
      reportTitle: 'Relatório do CoreSet',
      reportDescription:
        'Visualize o relatório gerado a partir do preenchimento do Core Set.',
      reportResultTitle: 'Resultado do relatório',
      reportEasierWithFilters:
        'Facilite a visualização dos dados, escolhendo a parte do Core Set que deseja ser exibida na tela.',
      reportFilterLabel: 'Escolha a parte do Core Set a ser exibida',
      qualifiers: {
        ext: {
          0: 'Sem problema',
          1: 'Problema leve',
          2: 'Problema moderado',
          3: 'Problema grave',
          4: 'Problema completo',
        },
        nat: {
          0: 'Nenhuma mudança na estrutura',
          1: 'Ausência total',
          2: 'Ausência parcial',
          3: 'Parte adicional',
          4: 'Dimensão aberrante',
          5: 'Descontinuidade',
          6: 'Posição divergente',
          7: 'Mudanças qualitativas na estrutura',
        },
        loc: {
          0: 'Mais de uma região',
          1: 'Direito',
          2: 'Esquerdo',
          3: 'Ambos os lados',
          4: 'Frente',
          5: 'Atrás',
          6: 'Proximal',
          7: 'Distal',
        },
      },
    },
    prospectiveResultMap: {
      title: 'Mapa prospectivo de resultados',
      description:
        'Análise do que mais pontuou negativamente no resultado das CIF',
      mapDescription:
        'No mapa são exibidos os itens do Core Set preenchido para o paciente, conforme o nível de incapacidade.',
      reportTitle: 'Mapa prospectivo de resultados',
      reportDescription:
        'Análise do que mais pontuou negativamente no resultado das CIF',
      reportResultTitle: 'Resultado do relatório',
      reportEasierWithFilters:
        'Facilite a visualização dos dados, escolhendo a parte do Core Set que deseja ser exibida na tela.',
      reportFilterLabel: 'Escolha a parte do Core Set a ser exibida',
      saveFailed: 'Não foi possível salvar o diagnóstico..',
      saveSuccess: 'Diagnóstico registrado(a) com sucesso!',
    },
    globalPrognostic: {
      title: 'Prognóstico global',
      description: 'Entendas os pontos fortes e fracos de seu paciente',
      weaknessAndStrengths: 'Pontos fortes e fracos',
      weaknessAndStrengthsDescription:
        'Verifique abaixo os itens fortes e fracos da última análise do paciente.',
      weaknesses: 'Pontos fracos',
      strengths: 'Pontos fortes',
      reportTitle: 'Relatório do Prognóstico global',
      reportDescription: 'Visualize o relatório do paciente',
      reportResultTitle: 'Resultado do relatório',
      reportEasierWithFilters:
        'Facilite a visualização dos dados, escolhendo a parte do Core Set que deseja ser exibida na tela.',
      scoreFilterLabel: 'Filtre pela pontuação',
      reportScoreFilterOptions: {
        negative: 'Pontos fracos',
        positive: 'Pontos fortes',
      },
      reportFilterLabel: 'Escolha a parte do Core Set a ser exibida',
      saveFailed: 'Não foi possível salvar o diagnóstico..',
      saveSuccess: 'Diagnóstico registrado(a) com sucesso!',
    },
    neuropsichologicalProfile: {
      title: 'Perfil neuropsicológico',
      description:
        'Entenda os outros déficits que o paciente possui a partir da união de informações detalhadas do paciente.',
      intelectualOperation: 'Funcionamento intelectual',
      intelectualOperationDescription: 'Escolha apenas uma opção',
      intelectualOperationTooltip:
        'Inteligência é a capacidade de pensar racionalmente, aprender com eficácia, compreender ideias complexas e se adaptar ao ambiente. Conseqüentemente, a inteligência é melhor vista como uma habilidade geral que pode influenciar o desempenho em uma ampla gama de tarefas cognitivas. O quoeficiente  de inteligência (QI) é a quantificação da inteligência de um indivíduo em relação a seus pares de idade semelhante, sendo  uma das características psicológicas mais hereditárias, e a pontuação de um indivíduo em um teste moderno de QI é um bom preditor de muitos resultados de eficácia, incluindo sucesso educacional e profissional, saúde (Gottfredson 1998). {linebreak}{linebreak}Conforme a CIF, a inteligência é classificada na categoria b117.{linebreak} - b117 Funções intelectuais{linebreak}Funções mentais gerais, necessárias para compreender e integrar de forma construtiva as diferentes funções mentais, incluindo todas as funções cognitivas e seu desenvolvimento ao longo da vida. {linebreak}- Inclui: funções de desenvolvimento intelectual, retardo intelectual, re- tardo mental, demência {linebreak}- Exclui: funções da memória (b144), funções do pensamento (b160), fun- ções cognitivas superiores (b164) {linebreak}{linebreak}Gottfredson, L. S. (1998). The general intelligence factor. Scientific American Presents, 9, 24–30. {linebreak}Matzel, Louis & Sauce, Bruno. (2017). IQ (The Intelligence Quotient). 10.1007/978-3-319-47829-6_1080-1. In book: Encyclopedia of Animal Cognition and Behavior. Publisher: Springer International Editors: J. Vonk & T.K. Shackelford.',
      universalFunctions: 'Funções universais',
      universalFunctionsMemory: 'Memória',
      universalFunctionsMemoryTooltip:
        'A memória pode ser definida como a capacidade de receber, armazenar e recuperar informações. Embora não seja possível restaurar o funcionamento da memória, é possível que as pessoas compensem, contornem ou reduzam seus problemas diários, e assim, vivam com mais eficiência em seus próprios ambientes de forma mais apropriada e funcional (LOSCHIAVO ALVARES & WILSON, 2020).{linebreak}{linebreak}Uma proposta taxonômica da memória é baseada na duração da retenção das informações. A de curto prazo refere-se à retenção de informações em breves intervalos de tempo (da ordem de segundos). Por outro lado, a memória de longo prazo  envolve a aquisição e retenção de informações por longos períodos de tempo. E esta pode ainda ser subdividida em memória declarativa, aquisição e retenção de conhecimento, e memória não declarativa, mudanças no desempenho induzidas pela experiência, incluindo habilidades aprendidas e operações cognitivas modificáveis.  Logo, a memória declarativa ou explícita incluiria as memórias episódica e semântica. A memória de procedimento ou implícita incluiria habilidades (motoras, perceptuais e cognitivas), efeito de pré-ativação / priming, condicionamento clássico, habituação e tudo que foi aprendido mas que só pode ser aferido através do desempenho (Squire, 1986).{linebreak}Na CIF ela encontra-se descrita na categoria b144, incluindo, ainda, categorias de terceiro nível, conforme explicitado abaixo.{linebreak}{linebreak}b144 Funções da memória{linebreak}Funções mentais específicas de registro e armazenamento de informa- ções e sua recuperação quando necessário. {linebreak}     Inclui: funções da memória de curto e longo prazos, memória imediata, recente e remota, duração da memória; recuperação da memória, lem- brar-se; funções utilizadas na memória e no aprendizado como na am- nésia nominal, seletiva e dissociativa {linebreak}     Exclui: funções da consciência (b110); funções da orientação (b114); fun- ções intelectuais (b117); funções da atenção (b140); funções da percep- ção (b156); funções do pensamento (b160); funções cognitivas superiores (b164); funções mentais da linguagem (b167); funções de cálculo (b172) {linebreak}{linebreak}b1440 Memória de curto prazo {linebreak}     Funções mentais responsáveis pelo armazenamento temporário e frágil de informações na memória, de cerca de 30 segundos de duração, após os quais as informações são perdidas se não con- solidadas na memória de longo prazo. {linebreak}{linebreak}b1441 Memória de longo prazo {linebreak}     Funções mentais responsáveis pelo sistema de memória que permite o armazenamento de informações por longo prazo, pro- veniente da memória de curto prazo e da memória autobiográfi- ca dos eventos passados e da memória semântica para linguagem e fatos. {linebreak}{linebreak}b1442 Recuperação da memória {linebreak}     Funções mentais específicas que permitem recordar informa- ções armazenadas na memória de longo prazo e trazê-las à cons- ciência. {linebreak}{linebreak}b1448 Funções da memória, outras especificadas {linebreak}{linebreak}b1449 Funções da memória, não especificadas',
      universalFunctionsMemoryVerbal: 'Verbal',
      universalFunctionsMemoryNonVerbal: 'Não verbal (visual)',
      universalFunctionsMemoryQuestions: {
        codification: 'Codificação',
        storage: 'Armazenamento',
        evocation: 'Evocação',
      },
      universalFunctionsAttentionQuestions: {
        sustained: 'Sustentada (descrição e definição)',
        focused: 'Focalizada (descrição e definição)',
        divided: 'Dividida (descrição e definição)',
        alternated: 'Alternada (descrição e definição)',
        general: 'Atenção geral (descrição e definição)',
      },
      universalFunctionsAttention: 'Atenção',
      universalFunctionsAttentionTooltip:
        'Conforme Kandel (2009), prestar atenção em algo significa dar foco a determinados aspectos e, ao mesmo tempo, eliminar (ou ignorar) vários outros que estão ao redor, logo, o autor refere-se à atenção como “um filtro”, a partir do qual alguns itens ganham maior destaque, em detrimento de outros. Neste sentido, Myers (2012, p. 68) afirma que atenção é um feixe de luz: “Por meio da atenção seletiva, sua atenção consciente focaliza, como um feixe de luz, apenas um aspecto muito limitado de tudo aquilo que você vivencia”. {linebreak}{linebreak}Já Solhberg e Mateer (2015) propõem cinco componentes para organizar tanto a avaliação, a atenção, quanto às estratégias de intervenção, conforme explicitado a seguir.{linebreak}     A) Atenção focada: compreendida como a resposta básica ao estímulo, como virar a cabeça para estímulo auditivo. {linebreak}     B) Atenção mantida/sustentada: este componente engloba tanto a vigilância, ou seja, a manutenção da atenção ao longo do tempo durante atividade contínua, como também tem como pré-requisito a memória operacional, um componente executivo que faz a sustentação e a manipulação da informação alvo.{linebreak}     C) Atenção seletiva: capacidade de selecionar os estímulos alvo, atuando livre da distratibilidade (incapacidade de filtrar estímulos externos irrelevantes). {linebreak}     D) Atenção alternada: envolve a capacidade de flexibilidade mental, outro componente de interseção com as funções executivas.{linebreak}     E) Atenção dividida: corresponde à habilidade para responder simultaneamente a duas tarefas. {linebreak}{linebreak}Na CIF ela é mencionada na categoria b140, conforme segue na sequencia, já com as categorias de terceiro nível inclusas. {linebreak}{linebreak}b140 Funções da atenção{linebreak}     Funções mentais específicas de concentração em um estímulo externo ou experiência interna pelo período de tempo necessário. {linebreak}     Inclui: funções de manutenção da atenção, de mudança da atenção, de divisão da atenção, de compartilhar a atenção; concentração; distração {linebreak}     Exclui: funções da consciência (b110); funções da energia e de impul- sos (b130); funções do sono (b134); funções da memória (b144); fun- ções psicomotoras (b147); funções da percepção (b156) {linebreak}{linebreak}b1400  Manutenção da atenção {linebreak}     Funções mentais que produzem concentração pelo período de tempo necessário. {linebreak}{linebreak}b1401  Mudança da atenção {linebreak}     Funções mentais que permitem mudar a concentração de um estímulo para outro. {linebreak}{linebreak}b1402  Divisão da atenção {linebreak}     Funções mentais que permitem concentrar-se em dois ou mais estímulos ao mesmo tempo. {linebreak}{linebreak}b1403  Compartilhar a atenção {linebreak}     Funções mentais que permitem que duas ou mais pessoas se concentrem no mesmo estímulo, como uma criança e a pessoa que a cuida concentrando-se em um brinquedo. {linebreak}{linebreak}b1408  Funções da atenção, outras especificadas {linebreak}{linebreak}b1409  Funções da atenção, não especificadas',
      executiveFunctions: 'Funções executivas',
      executiveFunctionsTooltip:
        'Wardhaugh (2002, p. 2 conforme citado em Elmes, 2013) define a linguagem como: um conhecimento de regras e princípios e das maneiras de dizer e fazer coisas com sons, palavras e frases, em vez de apenas conhecimento de sons, palavras específicos , e frases{linebreak}Segundo Vygotsky (1962, conforme citado em Nunan, 2010), a linguagem desempenha um papel crucial no desenvolvimento cognitivo, pelo menos a partir do momento em que a criança promove a competência linguística. A linguagem, inicialmente desenvolvida como meio de comunicação social, é posteriormente internalizada e se torna uma ferramenta essencial na formação de processos cognitivos relevantes para a elaboração do sistema simbólico abstrato que permitirá à criança organizar o pensamento. Vygotsky (1978, conforme citado em Turuk, 2008) afirma que a criança adquire conhecimento por meio de contatos e interações com as pessoas como primeiro passo, depois assimila e internaliza esse conhecimento agregando a ele seu valor pessoal. A linguagem funciona como um organizador do conhecimento (Hamers & Blanc, 2000).{linebreak} {linebreak}Na Classificação Internacional de Funcionalidade, a linguagem é codificada na categoria b167, apresentada abaixo com suas categorias de terceiro e quarto níveis. {linebreak}b167 Funções mentais da linguagem Funções mentais específicas de reconhecimento e utilização de sinais, símbolos e outros componentes de uma linguagem. {linebreak}Inclui: funções de recepção e decifração da linguagem oral, escrita ou outras formas de linguagem como linguagem de sinais; funções de expressão da linguagem oral, escrita e de outras formas de linguagem; funções integrativas da linguagem oral e escrita como aquelas envolvidas na afasia receptiva, expressiva, afasia de Broca, de Wernicke e de condução. {linebreak}{linebreak}b1670 Recepção da linguagem {linebreak}Funções mentais específicas de decodificação das mensagens em linguagem oral, escrita ou outra como linguagem de sinais, para obter seu significado. {linebreak}      {linebreak}     b16700  Recepção da linguagem oral {linebreak}     Funções mentais de decodificação das mensagens orais para obter seu significado. {linebreak}     {linebreak}     b16701  Recepção de linguagem escrita {linebreak}     Funções mentais para decodificação de mensagens escritas para obter seu significado. {linebreak}     {linebreak}     b16702  Recepção da linguagem de sinais {linebreak}     Funções mentais de decodificação das mensagens em linguagens que utilizam sinais feitos pelas mãos e outros movimentos, para obter seu significado. {linebreak}{linebreak}     b16708  Recepção da linguagem, outra especificada {linebreak}{linebreak}     b16709  Recepção da linguagem, não especificada {linebreak}{linebreak}b1671 Expressão da linguagem {linebreak}Funções mentais específicas necessárias para produzir mensa- gens significativas expressas na forma oral, escrita, através de sinais ou outras formas de linguagem. {linebreak}{linebreak}     b16710 Expressão da linguagem oral {linebreak}     Funções mentais necessárias para produzir mensagens orais significativas. {linebreak}{linebreak}     b16711 Expressão da linguagem escrita {linebreak}     Funções mentais necessárias para produzir mensagens escritas significativas. {linebreak}{linebreak}     b16712 Expressão da linguagem de sinais {linebreak}     Funções mentais necessárias para produzir mensagens significativas em linguagens que utilizam sinais feitos pelas mãos e outros movimentos. {linebreak}{linebreak}b16718 Expressão da linguagem, outra especificada {linebreak}{linebreak}{linebreak}b16719 Expressão da linguagem, não especificada {linebreak}{linebreak}b1672  Funções integradoras da linguagem {linebreak}Funções mentais que organizam o significado semântico e simbólico, a estrutura gramatical e as idéias para a produção de mensagens em forma de linguagem oral, escrita ou de qualquer outra forma. {linebreak}{linebreak}b1678 Funções mentais da linguagem, outras especificadas {linebreak}{linebreak}b1679 Funções mentais da linguagem, não especificadas {linebreak}{linebreak}Wardhaugh, R. (2002). An introduction to sociolinguistics. (Fourth Ed.). Oxford: Blackwell Publishers. {linebreak}Hamers, J. F., & Blanc, M. H. A. (2000). Bilinguality and bilingualism (2nd Ed.). Cambridge, England: Cambridge University Press. {linebreak}Elmes, D. (2013). The relationship between language and culture. National Institute of Fitness and Sports in Kanoya International Exchange and Language Education Center, available at: www2. libnifsk. ac. jp/HPBU/annals/an46/46-11. Pdf. {linebreak}Turuk, M. C. (2008). The relevance and implications of Vygotsky’s sociocultural theory in the second language classroom. Arecls, 5, 244-262. {linebreak}ORGANIZAÇÃO MUNDIAL DA SAÚDE. CIF – Classificação Internacional de Funcionalidade Incapacidade e Saúde. São Paulo: Edusp, 2015.',
      executiveFunctionsQuestions: {
        planning: 'Planejamento e resolução de problemas',
        implementation:
          'Implementação de um plano ou ação (algo a se realizar)',
        correction: 'Auto-monitoramento e correção',
        flexibility: 'Flexibilidade',
        impulsiveness: 'Impulsividade',
        operationalMemory: 'Memória operacional',
      },
      cognitiveFunctions: 'Funções cognitivas',
      cognitiveFunctionsLanguage: 'Linguagem',
      cognitiveFunctionsNumericCognition: 'Cognição numérica',
      cognitiveFunctionsSocialSkills: 'Habilidades sociais',
      cognitiveFunctionsMotorSkills: 'Habilidades motoras',
      cognitiveFunctionsLanguageTooltip:
        'Wardhaugh (2002, p. 2 conforme citado em Elmes, 2013) define a linguagem como: um conhecimento de regras e princípios e das maneiras de dizer e fazer coisas com sons, palavras e frases, em vez de apenas conhecimento de sons, palavras específicos , e frases{linebreak}Segundo Vygotsky (1962, conforme citado em Nunan, 2010), a linguagem desempenha um papel crucial no desenvolvimento cognitivo, pelo menos a partir do momento em que a criança promove a competência linguística. A linguagem, inicialmente desenvolvida como meio de comunicação social, é posteriormente internalizada e se torna uma ferramenta essencial na formação de processos cognitivos relevantes para a elaboração do sistema simbólico abstrato que permitirá à criança organizar o pensamento. Vygotsky (1978, conforme citado em Turuk, 2008) afirma que a criança adquire conhecimento por meio de contatos e interações com as pessoas como primeiro passo, depois assimila e internaliza esse conhecimento agregando a ele seu valor pessoal. A linguagem funciona como um organizador do conhecimento (Hamers & Blanc, 2000). {linebreak}{linebreak}Na Classificação Internacional de Funcionalidade, a linguagem é codificada na categoria b167, apresentada abaixo com suas categorias de terceiro e quarto níveis. {linebreak}{linebreak}      b167 Funções mentais da linguagem{linebreak}      Funções mentais específicas de reconhecimento e utilização de sinais, símbolos e outros componentes de uma linguagem. {linebreak}      Inclui: funções de recepção e decifração da linguagem oral, escrita ou outras formas de linguagem como linguagem de sinais; funções de expressão da linguagem oral, escrita e de outras formas de linguagem; funções integrativas da linguagem oral e escrita como aquelas envolvidas na afasia receptiva, expressiva, afasia de Broca, de Wernicke e de condução. {linebreak}{linebreak}      b1670 Recepção da linguagem {linebreak}      Funções mentais específicas de decodificação das mensagens em linguagem oral, escrita ou outra como linguagem de sinais, para obter seu significado. {linebreak}{linebreak}      b16700  Recepção da linguagem oral {linebreak}      Funções mentais de decodificação das mensagens orais para obter seu significado. {linebreak}      {linebreak}      b16701  Recepção de linguagem escrita {linebreak}      Funções mentais para decodificação de mensagens escritas para obter seu significado. {linebreak}{linebreak}      b16702  Recepção da linguagem de sinais {linebreak}      Funções mentais de decodificação das mensagens em linguagens que utilizam sinais feitos pelas mãos e outros movimentos, para obter seu significado. {linebreak}      {linebreak}      b16708  Recepção da linguagem, outra especificada {linebreak}{linebreak}      b16709  Recepção da linguagem, não especificada {linebreak}{linebreak}      b1671 Expressão da linguagem {linebreak}      Funções mentais específicas necessárias para produzir mensa- gens significativas expressas na forma oral, escrita, através de sinais ou outras formas de linguagem. {linebreak}{linebreak}      b16710 Expressão da linguagem oral {linebreak}      Funções mentais necessárias para produzir mensagens orais significativas. {linebreak}{linebreak}      b16711 Expressão da linguagem escrita {linebreak}      Funções mentais necessárias para produzir mensagens escritas significativas. {linebreak}{linebreak}      b16712 Expressão da linguagem de sinais {linebreak}      Funções mentais necessárias para produzir mensagens significativas em linguagens que utilizam sinais feitos pelas mãos e outros movimentos. {linebreak}{linebreak}      b16718 Expressão da linguagem, outra especificada {linebreak}{linebreak}      b16719 Expressão da linguagem, não especificada {linebreak}{linebreak}      b1672  Funções integradoras da linguagem {linebreak}      Funções mentais que organizam o significado semântico e simbólico, a estrutura gramatical e as idéias para a produção de mensagens em forma de linguagem oral, escrita ou de qualquer outra forma. {linebreak}{linebreak}      b1678 Funções mentais da linguagem, outras especificadas {linebreak}{linebreak}      b1679 Funções mentais da linguagem, não especificadas {linebreak}{linebreak}Wardhaugh, R. (2002). An introduction to sociolinguistics. (Fourth Ed.). Oxford: Blackwell Publishers. {linebreak}Hamers, J. F., & Blanc, M. H. A. (2000). Bilinguality and bilingualism (2nd Ed.). Cambridge, England: Cambridge University Press. {linebreak}Elmes, D. (2013). The relationship between language and culture. National Institute of Fitness and Sports in Kanoya International Exchange and Language Education Center, available at: www2. libnifsk. ac. jp/HPBU/annals/an46/46-11. Pdf. {linebreak}Turuk, M. C. (2008). The relevance and implications of Vygotsky’s sociocultural theory in the second language classroom. Arecls, 5, 244-262. {linebreak}ORGANIZAÇÃO MUNDIAL DA SAÚDE. CIF – Classificação Internacional de Funcionalidade Incapacidade e Saúde. São Paulo: Edusp, 2015.',
      cognitiveFunctionsSocialSkillsTooltip:
        'As habilidades sociais se definem pela relação entre as instâncias de respostas observáveis em episódios de interação social e os antecedentes (demandas ou estímulos discriminativos) e conseqüentes (observados ou inferidos como prováveis a curto e/ou médio prazo) associados a essas respostas. Além da função, também a forma da resposta é importante para caracterizá-la como habilidade social. {linebreak}{linebreak}A diversidade de combinações entre as características formais e funcionais de determinadas respostas sociais, caracteriza um amplo conjunto de classes de comportamento que podem ser classificadas como: habilidades sociais de comunicação, de assertividade, empáticas, de solução de problemas interpessoais, dentre outras. Cada uma dessas classes é geralmente composta por subclasses, como por exemplo, perguntar, responder, concordar, discordar, instruir, questionar (Del Prette & Del Prette, 2008).{linebreak}{linebreak}Na CIF elas fazem parte das funções psicossociais globais, conforme explicitado abaixo.{linebreak}{linebreak}      b122 Funções psicossociais globais{linebreak}      Funções mentais gerais, como elas se desenvolvem ao longo da vida, necessárias para compreender e integrar construtivamente as funções mentais que levam à formação das habilidades interpessoais necessárias para o estabelecimento de interações sociais recíprocas, tanto em termos de significado como de objetivo. {linebreak}      Inclui: autismo {linebreak}{linebreak}Del Prette, Zilda Aparecida Pereira, & Del Prette, Almir. (2008). Um sistema de categorias de habilidades sociais educativas. Paidéia (Ribeirão Preto), 18(41), 517-530. https://dx.doi.org/10.1590/S0103-863X2008000300008',
      cognitiveFunctionsPraxisTooltip:
        'Praxia é a capacidade de realizar ações específicas e predefinidas ou de realizar movimentos aprendidos e propositais, independentemente de déficits sensoriais, motores e cognitivos que possam prejudicar a compreensão da tarefa, o reconhecimento do estímulo e a implementação da resposta. {linebreak}{linebreak}A apraxia é, portanto, causada por lesões cerebrais adquiridas e surge como uma discrepância na precisão entre a ação pretendida e o desempenho real. A apraxia é evidenciada nas atividades diárias e em testes padronizados que requerem ações a serem realizadas por comando e / ou por imitação. Importante ressaltar que ela não é um comprometimento unitário com uma base neuropsicológica única (CUBELLI, 2017).{linebreak}{linebreak}No ambiente clínico, existem diferentes formas de apraxia. A apraxia ideomotora é relacionada a uma alteração na produção de gestos (léxico de saída) após um comando verbal. Os pacientes geralmente apresentam dificuldades em ambos os membros superiores para realizar gestos simbólicos (transitivos) ou sem objeto (pantomimas). Os indivíduos sabem o que devem fazer, mas, quando têm que colocar o gesto em prática, não conseguem (HEILMAN; ROTHI; VALENSTEIN, 1982; ROTHI; HEILMAN; WATSON, 1985). {linebreak}{linebreak}A  construtiva tem como base dificuldades visuoconstrutivas, ou seja, as pessoas com esse déficit apresentam falhas para elaborar desenhos e/ou construções tridimensionais, tarefa que exige habilidades visuais e planejamento motor (GUÉRIN; SKA; BELLE‐ VILLE, 1999). A apraxia reflexiva refere‐se à seqüência de gestos não conhecidos, como fazer uma série de gestos com as mãos. Ela requer a existência de um déficit na via não léxica (ROTHI; OCHIPA; HEILMAN, 1997). Pacientes com esse transtorno podem ter dificuldade para fazer imitações e aprender movimentos novos, quando não reconhecidos como um gesto com significado. {linebreak}{linebreak}Na CIF elas são compõem a categoria b176.{linebreak}{linebreak}      b176 Funções mentais de seqüenciamento de movimentos complexos Funções mentais específicas de seqüenciamento e coordenação de movimentos complexos e com finalidade determinada . {linebreak}      Inclui: deficiências como apraxia ideacional, ideomotora, oculomotora, da fala e do vestir {linebreak}       Exclui: funções psicomotoras (b147); funções cognitivas superiores (b164); Capítulo 7 – Funções neuromusculoesqueléticas e relacionadas aos movimentos {linebreak}{linebreak}Cubelli R. Definition: Apraxia. Cortex. 2017;93:227. doi:10.1016/j.cortex.2017.03.012',
      cognitiveFunctionsNumericCognitionTooltip:
        'A cognição numérica, conforme Santos et al. (2012),  baseia-se em dois componentes, a saber: o processamento numérico e cálculo. Seu desenvolvimento é influenciado por fatores biológicos, cognitivos, educacionais e culturais.{linebreak}{linebreak}O cálculo se refere às operações matemáticas, como adição, subtração, multiplicação e divisão; que requerem palavras operacionais (mais, menos, vezes, divisão) e símbolos (+, -, × ou ÷), a recuperação deles e de outros fatos aritméticos, e o procedimento de cálculo aritmético. Já o processamento numérico refere-se à compreensão dos símbolos numéricos associados às quantidades e à produção de números na leitura, escrita e contagem de números (McCloskey, Caramazza, & Basili, 1985). {linebreak}{linebreak}O processamento das operações matemáticas na prática depende: a) da disponibilidade de representações cognitivas de números - arábico visual, verbal e magnitude analógica - (modelo de código triplo; Dehaene, 1997), que interagem dinamicamente sem a necessidade de associação entre os números, e as próprias quantidades (Dehaene & Cohen, 2000); b) habilidades numéricas que são baseadas em uma variedade de representações específicas da modalidade (por exemplo, códigos visuoespaciais e verbais-auditivos) em diversas tarefas de processamento de números que suportam a visão específica integrada (complexo de codificação) do processamento de números (Campbell & Clark, 1992) .{linebreak}{linebreak}Campbell, J. I. D., & Clark, J. M. (1992). Cognitive number  processing: An encoding-complex perspective. In J. I. D.Campbell (Ed.),The nature and origins of mathematical skills (pp. 457-492). Amsterdam, The Netherlands: Elsevier. {linebreak}{linebreak}Dehaene, S. (1997). The number sense. Oxford, England: OxfordUniversity Press.{linebreak}Dehaene, S., & Cohen, L. (2000). Un modèle arithmétique efonctionnel de l’arithmétique mental [An arithmetic andfunctional model of mental arithmetic]. In M. Pesenti & X.Seron (Eds.), Neuropsychologie des troubles du cálculo e dutraitement dês números (pp. 191-232). Marseille, France: Solal.{linebreak}McCloskey, M., Caramazza, A., & Basili, A. (1985). Cognitivemechanisms in number processing and calculation: Evidencefrom discalculia. Brain and Cognition, 4, 171–196. http://dx.doi.org/10.1016/0278-2626(85)90069-7{linebreak}Santos, F., Da Silva, P., Ribeiro, F., Dias, A., Frigério, M., Dellatolas, G., & Von Aster, M. (2012). Number Processing and Calculation in Brazilian Children Aged 7-12 Years. The Spanish Journal of Psychology, 15(2), 513-525. doi:10.5209/rev_SJOP.2012.v15.n2.38862{linebreak}{linebreak}      b172 Funções de cálculo{linebreak}      Funções mentais específicas de determinação, aproximação e manipulação de símbolos e processos matemáticos. {linebreak}      Inclui: funções de adição, subtração e outros cálculos matemáticos sim- ples; funções de operações matemáticas complexas {linebreak}      Exclui: funções da atenção (b140); funções da memória (b144); funções do pensamento (b160); funções cognitivas superiores (b164); funções mentais da linguagem (b167) {linebreak}{linebreak}      b1720 Cálculo simples {linebreak}Funções mentais de computação com números, como adição, subtração, multiplicação e divisão. {linebreak}{linebreak}      b1721 Cálculo complexo {linebreak}      Funções mentais de tradução de problemas formulados verbalmente em procedimentos aritméticos, tradução de fórmulas matemáticas em procedimentos aritméticos e outras manipulações complexas que envolvem números. {linebreak}{linebreak}      b1728 Funções de cálculo, outras especificadas {linebreak}{linebreak}      b1729 Funções de cálculo, não especificadas',
      cognitiveFunctionsMotorSkillsTooltip:
        'Habilidades motoras (também chamadas de movimento) são definidas como padrões de movimento observáveis e direcionados a um objetivo (Burton & Miller, 1998). {linebreak}{linebreak}Na CIF, o controle movimento está classificado, de uma forma mais ampla, em duas categorias, e b760 Funções  relacionadas ao controle dos movimentos voluntários e b765 Funções  relacionadas ao controle dos movimentos involuntários. {linebreak}b760 Funções relacionadas ao controle dos movimentos voluntários Funções associadas ao controle sobre os movimentos voluntários e à co- ordenação dos mesmos. {linebreak}Inclui: funções de controle de movimentos voluntários simples e de movi- mentos voluntários complexos, coordenação de movimentos voluntários, funções de apoio de braço ou perna, coordenação motora direita-esquer- da, coordenação olho-mão, coordenação olho-pé; deficiências como pro- blemas de controle e coordenação, e.g., disdiadococinesia {linebreak}Exclui: funções relacionadas à força muscular (b730); funções relacio- nadas aos movimentos involuntários (b765); funções relacionadas ao padrão da marcha (b770) {linebreak}b7600  Controle de movimentos voluntários simples {linebreak}Funções associadas ao controle e à coordenação dos movimentos voluntários simples ou isolados. {linebreak}b7601  Controle dos movimentos voluntários complexos {linebreak}Funções associadas ao controle e à coordenação dos movimentos voluntários complexos. {linebreak}b7602  Coordenação dos movimentos voluntários {linebreak}Funções associadas à coordenação dos movimentos voluntários simples e complexos, realizando movimentos em uma seqüência ordenada. {linebreak}Inclui: coordenação direita-esquerda, coordenação de movimentos dirigidos visualmente, como coordenação olho-mão e coordenação olho-pé; deficiências como disdiadococinesia {linebreak}b7603  Funções de apoio do braço ou perna {linebreak}Funções associadas ao controle e coordenação dos movimentos voluntários quando se colocam pesos sobre os braços (cotove- los ou mãos) ou sobre as pernas (joelhos ou pés). {linebreak}b7608 Funções relacionadas ao controle dos movimentos voluntários, outras especificadas {linebreak}b7609 Funções relacionadas ao controle dos movimentos voluntá- rios, não especificadas {linebreak}b765 Funções relacionadas aos movimentos involuntários{linebreak}Funções de contrações involuntárias, não ou semi-intencionais de um músculo ou grupo de músculos. {linebreak}Inclui: contrações involuntárias dos músculos; deficiências como tre- mores, tiques, maneirismos, estereótipos, perseveração motora, coréia, atetose, tiques vocais, movimentos distônicos e discinesia {linebreak}Exclui: funções relacionadas ao controle dos movimentos voluntários (b760); funções relacionadas ao padrão da marcha (b770) {linebreak}b7650 Contração involuntária dos músculos {linebreak}Funções de contração involuntária, não ou semi-intencional de um músculo ou grupo de músculos, como aqueles envolvidos em parte de uma disfunção psicológica. {linebreak}Inclui: deficiências como movimentos coreicos e atetósicos; desordens de movimento relacionado ao sono {linebreak}{linebreak}b7651 Tremor {linebreak}Funções de alternância de contração e relaxamento de um gru- po de músculos em torno de uma articulação, resultando em agitação. {linebreak}{linebreak}b7652 Tiques e maneirismos {linebreak}Funções de contrações repetitivas, quase intencionais e invo- luntárias de um grupo de músculos. {linebreak}Inclui: deficiências como tiques vocais, coprolalia e bruxismo {linebreak}{linebreak}b7653 Estereótipos e perseverância motora {linebreak}Funções de movimentos espontâneos, não intencionais como balançar repetitivamente para frente e para trás e inclinar ou sacudir a cabeça. {linebreak}{linebreak}b7658 Funções relacionadas aos movimentos involuntários, outras especificadas {linebreak}{linebreak}b7659 Funções relacionadas aos movimentos involuntários, não especificadas {linebreak}{linebreak}Burton, A. W., & Miller, D. E. (1998). Defining and Classifying Movement Skills Movement skill assessment: Human Kinetics.',
      cognitiveFunctionsLanguageQuestions: {
        expression: 'Expressão',
        comprehension: 'Compreensão',
      },
      cognitiveFunctionsNumericCognitionQuestions: {
        calculation: 'Cálculo',
        numericProcessing: 'Processamento numérico',
      },
      cognitiveFunctionsSocialSkillsQuestions: {
        socialSkill: 'Habilidade social',
        praxis: 'Praxia',
        motorPraxis: 'Praxia motora',
        ideationalPraxis: 'Praxia ideacional',
      },
      cognitiveFunctionsMotorSkillsQuestions: {
        rough: 'Coordenação motora grossa',
        soft: 'Coordenação motora fina',
      },
      additionalInformationMedicationTooltip:
        'Uma vez que a cognição representa um dos fatores fulcrais nos transtornos psiquiátricos, e, considerando sua intrínseca relação com os fármacos, é de extrema relevância abarcar tal aspecto na formulação do raciocínio clínico para intervenção na RN.',
      additionalInformationNeuroprogressionTooltip:
        "Influências Biológicas e Prognóstico Geral{linebreak}{linebreak}Enquanto o modelo original de 2002 incluía a consideração do “quanto” de recuperação esperar após uma lesão cerebral, é mais relevante na clínica dos transtornos psiquiátricos considerar o prognóstico, particularmente no que tange à neuroprogressão. Este termo tem sido usado para definir a reorganização patológica do sistema nervoso central (SNC) ao longo do curso de transtornos mentais graves (GAMA, KUNZ, MAGALHÃES & KAPCZINSKI, 2013). Especificamente no transtorno afetivo bipolar (TAB), a reatividade do substrato neural é alterada por episódios repetidos de alteração do humor, promovendo uma reconexão cerebral, com a ativação de certos circuitos, que incorre em uma maior vulnerabilidade ao estresse da vida (VIETA et al., 2012).{linebreak}{linebreak}Aqui, é importante considerar a “carga alostática” (KAPCZINSKI et al., 2008), ou seja, a capacidade de alcançar a estabilidade através da mudança (MCEWEN & STELLAR, 1993). Os sistemas alostáticos ou adaptativos têm um papel fundamental na resposta a uma variedade de situações que não sejam estritamente alterações fisiológicas, como estar acordado ou adormecido, se exercitar, lidar com ruídos, infecções, fome etc. Para perceber ou antecipar demandas, há uma necessidade de alterar os parâmetros internos a fim de manter o funcionamento normal.{linebreak}{linebreak}Inicialmente, os mecanismos alostáticos são protetores para o organismo; no entanto, há um custo a ser pago por essa redefinição forçada de parâmetros, especialmente se os processos alostáticos se tornarem extremos ou ineficientes (KAPCZINSKI et al., 2008). Em outras palavras, a carga alostática é o 'desgaste' do corpo e do cérebro que resulta da hiperatividade crônica ou inatividade dos sistemas fisiológicos envolvidos na adaptação aos desafios ambientais (MCEWEN & WINGFIELD, 2003).{linebreak}{linebreak}Algumas doenças neuropsiquiátricas foram investigadas à luz dos paradigmas da carga alostática, em particular a doença de Alzheimer (SWAAB, BAO & LUCASSEN, 2005), transtorno de estresse pós-traumático (GLOVER, 2006), transtornos por uso de substâncias (ZIMMERMANN, BLOMEYER, LAUCHT & MANN , 2006) e depressão maior (MCEWEN, 2003). {linebreak}{linebreak}No curso do TAB, a instabilidade crônica do humor gera estresse fisiológico com efeitos neurotóxicos, levando a danos neurológicos e declínio cognitivo ao longo da doença (MCEWEN & WINGFIELD, 2003). Neste transtorno, as evidências de possíveis efeitos do estresse no cérebro vêm de estudos de neuroimagem que encontraram anormalidades morfológicas.{linebreak}{linebreak}Em uma revisão recente, Arnone et al. (2009) concluíram que este transtorno está associado a reduções de volume do cérebro inteiro e do lobo pré-frontal, juntamente com aumentos de volume dos ventrículos laterais. Há evidências de que essas anormalidades cerebrais e relacionadas ao transtorno estão associadas tanto ao declínio cognitivo (STRAKOWSKI et al., 2005) quanto ao declínio psicossocial (FORCADA et al., 2010). Tomados em conjunto, esses estudos sugerem um declínio cognitivo, neurológico e psicossocial relacionado ao estresse em pessoas com TAB que sofrem de um curso mais grave da doença. {linebreak}{linebreak}Considerando o acima exposto, como os efeitos fisiológicos do estresse são neurotóxicos e levam ao declínio cognitivo ao longo do tempo, é muito importante considerar todas as variáveis clínicas para estabelecer o prognóstico da reabilitação neuropsicológica (LEVY, MANOVE & WEISS, 2012).",
      additionalInformation: 'Informações adicionais',
      describeLabel: 'Descreva',
      describePlaceholder: 'Digite aqui a descrição',
      qualifiers: {
        '1': '1. Abaixo da média',
        '2': '2. Mediano',
        '3': '3. Médio superior',
        '4': '4. Superior',
        '0': '0. Outro',
      },
      medicationTitle: 'Medicação em uso',
      medicationClassLabel: 'Classe da medicação',
      medicationClassPlaceholder: 'Selecione a medicação',
      medicationDosageLabel: 'Dosagem (mg)',
      medicationDosagePlaceholder: 'Digite a dosagem',
      medicationDosageEmpty: 'Descreva a dosagem da medicação',
      addMedication: 'Adicionar medicação',
      neuroProgression: 'Neuro progressão',
      diagnosisAgeLabel:
        'Idade do diagnóstico (idade a qual o paciente descobriu o diagnóstico)',
      diagnosisAgePlaceholder: 'Selecione a idade do diagnóstico',
      evolutionTimeLabel: 'Tempo de evolução',
      evolutionTimePlaceholder: 'Digite o tempo de evolução',
      familyHistoryLabel: 'História familiar',
      familyHistoryPlaceholder: 'Digite sobre a história',
      moodSwingEpisodesLabel: 'Episódios de alteração de humor',
      moodSwingEpisodesPlaceholder: 'Digite sobre os episódios',
      selfTerminationAttemptsLabel: 'Número de tentativas de auto extermínio',
      selfTerminationAttemptsPlaceholder: 'Digite o número de tentativas',
      drugUsageLabel: 'Uso de drogas',
      drugUsagePlaceholder: 'Selecione a opção',
      drugFrequencyLabel: 'Frequência',
      drugFrequencyPlaceholder: 'Selecione a frequência',
      drugAmountLabel: 'Quantidade',
      drugAmountPlaceholder: 'Digite a quantidade',
      drugUsageTimeLabel: 'Usuário a quanto tempo?',
      drugUsageTimePlaceholder: 'Digite quanto tempo',
      psychiatricHospitalizationsLabel: 'Número de internações psiquiátricas',
      psychiatricHospitalizationsPlaceholder: 'Digite o número de internações',
      ectLabel: 'E.C.T. (eletro convulso terapia)',
      ectPlaceholder: 'Número de ocorrências',
      patientOrFamilyTestimony: 'Relato do(a) paciente/família',
      mainComplaintsLabel: 'Queixas principais',
      mainComplaintsPlaceholder: 'Digite as queixas',
      medicationOptions: {
        antidepressants: 'Antidepressivos',
        moodStabilizers: 'Estabilizadores de Humor',
        antipsychotics: 'Antipsicóticos',
        psychostimulants: 'Psicoestimulantes',
        benzodiazepines: 'Benzodiazepínicos',
        others: 'Outros',
      },
      drugUsageOptions: {
        true: 'Sim',
        false: 'Não',
      },
      drugFrequencyOptions: {
        seldom: 'Pouco frequente',
        sometimes: 'Frequente',
        often: 'Muito frequente',
      },
      filledForms: 'Formulários preenchidos',
      forms: 'Formulários',
      saveFailed: 'Não foi possível salvar o diagnóstico..',
      reportTitle: 'Relatório do Perfil Neuropsicológico',
      reportDescription:
        'Visualize o relatório gerado a partir do preenchimento do Perfil neuropsicológico',
      reportResultTitle: 'Resultado do relatório',
      reportEasierWithFilters:
        'Facilite a visualização dos dados, escolhendo a parte do Perfil Neuropsicológico que deseja ser exibida na tela.',
      reportFilterLabel:
        'Escolha a parte do Perfil Neuropsicológico a ser exibida',
      saveSuccess: 'Diagnóstico registrado(a) com sucesso!',
    },
    healthImpact: {
      title: 'Impactos na condição de saúde',
      description: 'Preencha para complementar a análise de seu paciente.',
      noSubjectSelected: 'Você não selecionou nenhum assunto..',
      subjectEmpty: 'Você não preencheu um dos assuntos selecionados..',
      formIncomplete: 'Você não respondeu todo o questionário..',
      subjects: 'Impactos na condição de saúde',
      subjectsDescription:
        'Informe os dados sobre o impacto da condição de saúde, fatores psicológicos e possíveis efeitos na reabilitação neuropsicológica do paciente.',
      subjectSelectLabel: 'Escolha o(s) assunto(s) que você deseja documentar:',
      subjectSelectPlaceholder: 'Selecione os assuntos',
      subjectsDescribeLabel: 'Descreva',
      subjectsDescribePlaceholder: 'Descreva os impactos',
      subjectOptions: {
        stigma: 'Estigma',
        personality: 'Personalidade',
        occupationalHistory: 'Histórico ocupacional',
        negativeBeliefs: 'Crenças negativas e pensamentos disfuncionais',
        familyRelations: 'Relações familiares e contextos',
        // coping: 'Coping',
        // anxiety: 'Ansiedade',
        // humour: 'Humor',
        lifeQuality: 'Qualidade de vida (WHOQOL Bref)',
        // sleepQuality: 'Qualidade do sono',
      },
      subjectsOccupationalHistoryFields: {
        work: 'Trabalho',
        leisure: 'Lazer',
        ambient: 'Ambiente',
        others: 'Outros',
      },
      subjectsFamilyRelationsFields: {
        family: 'Família',
        ambient: 'Ambiente',
        context: 'Contexto',
      },
      subjectsSelected: 'Assuntos escolhidos',
      form: 'Questionário',
      saveSuccess: 'Diagnóstico registrado(a) com sucesso!',
      saveFailed: 'Não foi possível salvar o diagnóstico..',
    },
  },
  account: {
    title: 'Configurações',
    description:
      'Mude suas informações pessoais ou as configurações da sua conta',
    personalInfo: 'Informações pessoais',
    savePersonalInfo: 'Salvar informações',
    myPlans: 'Meu plano',
    firstNameLabel: 'Nome',
    firstNamePlaceholder: 'Digite seu nome',
    lastNameLabel: 'Sobrenome',
    lastNamePlaceholder: 'Digite seu sobrenome',
    idDocumentTypeLabel: 'Tipo de documento',
    idDocumentTypePlaceholder: 'Selecione o tipo de documento',
    idDocumentNumberLabel: 'Número do documento',
    idDocumentNumberPlaceholder: 'Digite o número do documento',
    phoneNumberLabel: 'Número para contato',
    phoneNumberPlaceholder: 'Digite seu número para contato',
    emailLabel: 'E-mail',
    emailPlaceholder: 'Digite seu e-mail',
    languageLabel: 'Idioma',
    languagePlaceholder: 'Selecione seu idioma',
    countryLabel: 'País',
    countryPlaceholder: 'Selecione o seu país',
    timezoneLabel: 'Fuso horário',
    timezonePlaceholder: 'Selecione o seu fuso horário',
    updatePassword: 'Criar nova senha? {clickHere}',
    clickHere: 'Clique aqui',
    updatePasswordTitle: 'Criar nova senha',
    currentPasswordLabel: 'Senha atual',
    currentPasswordPlaceholder: 'Digite sua senha atual',
    newPasswordLabel: 'Nova senha',
    newPasswordPlaceholder: 'Digite sua nova senha',
    confirmPasswordLabel: 'Confirmar senha',
    confirmPasswordPlaceholder: 'Confirme sua nova senha',
    submitNewPassword: 'Definir nova senha',
    passwordMismatch:
      'As senhas não correspondem, confirme novamente sua senha.',
    languages: {
      'pt-BR': 'Português (Brasil)',
    },
    countries: {
      brazil: 'Brasil',
    },
    timezones: {
      'America/Sao_Paulo': 'São Paulo (GMT -03:00)',
    },
    updateAccountPasswordSuccess: 'Senha atualizada com sucesso.',
    updateAccountPasswordFailed: 'Não foi possível alterar sua senha.',
    editAccountSuccess: 'Informações de perfil atualizadas com sucesso.',
    editAccountFailed: 'Não foi possível alterar sua senha.',
    invalidPersonalInfo: 'Você precisa preencher todos os campos!',
  },
  goals: {
    createGoalSuccess: 'Meta registrada com sucesso!',
    createGoalFailed: 'Não foi possível registrar a meta.',
    editGoalSuccess: 'As informações da meta foram alteradas.',
    editGoalFailed: 'Não foi possível salvar as informações da meta.',
    changeGoalStatusSuccess: 'O status da meta foi alterado.',
    changeGoalStatusFailed: 'Não foi possível alterar o status da meta.',
  },
};

const isStringOrObject = (value: unknown) =>
  typeof value === 'string' || typeof value === 'object';

type PairValue = string | string[] | NestedLocale;
type NestedLocale = { [key: string]: PairValue };
type FlatLocale = { [key: string]: string };

function mapPair(parentKey: string, value: PairValue) {
  if (Array.isArray(value)) {
    return value.map((item, index) => ({ [`${parentKey}[${index}]`]: item }));
  }

  if (typeof value === 'object') {
    return Object.entries(value).map(([childKey, childValue]) => ({
      [`${parentKey}.${childKey}`]: childValue,
    }));
  }

  return [{ [parentKey]: value }];
}

function transformNestedLocale(localeTree: NestedLocale): FlatLocale {
  const pairs = Object.entries(localeTree);
  const invalidPairs = pairs.filter((pair) => !isStringOrObject(pair[0]));

  if (invalidPairs.length) {
    throw new Error('Invalid locale tree');
  }

  if (pairs.every((pair) => typeof pair[1] === 'string')) {
    return localeTree as FlatLocale;
  }

  const newLocaleTree = pairs
    .map(([key, value]) => mapPair(key, value))
    .flat()
    .reduce((acc, item) => ({ ...acc, ...item }), {});

  if (
    Object.entries(newLocaleTree).every((pair) => typeof pair[1] === 'string')
  ) {
    return newLocaleTree as FlatLocale;
  }

  return transformNestedLocale(newLocaleTree);
}

export default transformNestedLocale(pt_BR_LOCALE);
