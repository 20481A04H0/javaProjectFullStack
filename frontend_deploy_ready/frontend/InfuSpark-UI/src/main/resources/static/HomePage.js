function loadCourse(course) {
  const detail = document.getElementById("course-detail");
  detail.style.display = "block";

  let content = "";

  switch (course) {
    case "python":
      content = `
        <h2>Python Full Stack Developer</h2>
        <p>This program covers Python, Django, REST APIs, React or Angular, and deployment strategies. Learn to build scalable full-stack applications from scratch.</p>
        <ul>
          <li>Python Programming</li>
          <li>Django Framework</li>
          <li>Frontend with React/Angular</li>
          <li>RESTful APIs</li>
          <li>Deployment (AWS, Heroku)</li>
        </ul>
      `;
      break;

    case "java":
      content = `
        <h2>Java Full Stack Developer</h2>
        <p>Master core Java, Spring Boot, Hibernate, REST APIs, frontend development, and cloud deployment techniques.</p>
      `;
      break;

    case "azure":
      content = `
        <h2>Azure Databricks</h2>
        <p>Learn big data engineering and analytics on Azure with Spark, ML, and ETL pipelines.</p>
      `;
      break;

    case "aws":
      content = `
        <h2>AWS Cloud Fundamentals</h2>
        <p>Understand AWS services including EC2, Lambda, RDS, and deployment architecture.</p>
      `;
      break;

    case "data":
      content = `
        <h2>Data Engineering</h2>
        <p>Focus on data pipelines, ETL, big data technologies, and tools like Spark, Kafka, and Airflow.</p>
      `;
      break;

    case "gcp":
      content = `
        <h2>Google Cloud Platform (GCP)</h2>
        <p>Work with Google Cloud services like BigQuery, App Engine, and Kubernetes for enterprise-level solutions.</p>
      `;
      break;
  }

  detail.innerHTML = content;
  window.scrollTo({
    top: detail.offsetTop - 70,
    behavior: "smooth"
  });
}
