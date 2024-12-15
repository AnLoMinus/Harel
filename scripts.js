document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("healthStatement");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Validate form
    if (validateForm(formObject)) {
      // Handle form submission
      console.log("Form data:", formObject);
      // Here you would typically send the data to a server
      alert("Form submitted successfully!");
    }
  });

  function validateForm(data) {
    const requiredFields = {
      passportNo: "Passport Number",
      firstName: "First Name",
      lastName: "Last Name",
      dateOfBirth: "Date of Birth",
      sex: "Sex",
      height: "Height",
      weight: "Weight",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!data[field]) {
        alert(`Please enter ${label}`);
        return false;
      }
    }

    // Validate radio button groups
    const radioGroups = [
      "question3",
      "question4",
      "question5",
      "question6",
      "question7",
      "otherEyeDisease",
      "otherHeartDisease",
      "otherVascularDisease",
      "otherMetabolicDisease",
      "otherRespiratoryDisease",
      "otherDigestiveDisease",
      "otherLiverDisease",
      "herniaSurgery",
      "herniaSolved",
      "otherKidneyDisease",
      "otherJointDisease",
      "otherSkinDisease",
      "otherENTDisease",
      "cesareanDelivery",
      "otherMenDisease",
      "previousInsurance",
      "agreementToUse",
      "previousCancellation",
    ];

    for (const group of radioGroups) {
      if (!data[group]) {
        alert(`Please answer all required questions`);
        return false;
      }
    }

    // Validate conditional fields
    if (data.otherEyeDisease === "yes" && !data.otherEyeDiseaseDetails) {
      alert("Please specify the other eye disease/problem");
      return false;
    }
    if (data.otherHeartDisease === "yes" && !data.otherHeartDiseaseDetails) {
      alert("Please specify the other heart disease/problem");
      return false;
    }
    if (
      data.otherVascularDisease === "yes" &&
      !data.otherVascularDiseaseDetails
    ) {
      alert("Please specify the other vascular disease/problem");
      return false;
    }

    // Add validation for declaration section
    const declarationFields = [
      "agreementToUse",
      "previousCancellation",
      "declarationDate",
    ];

    for (const field of declarationFields) {
      if (!data[field]) {
        alert(`Please complete all required fields in the Declaration section`);
        return false;
      }
    }

    // Validate conditional fields
    if (data.previousCancellation === "yes" && !data.cancellationDetails) {
      alert(
        "Please specify the details of your previous insurance cancellation"
      );
      return false;
    }

    return true;
  }

  // Add event listeners for dynamic form behavior
  const heightInput = document.querySelector('input[name="height"]');
  const weightInput = document.querySelector('input[name="weight"]');

  [heightInput, weightInput].forEach((input) => {
    input.addEventListener("input", function () {
      if (this.value < 0) {
        this.value = 0;
      }
    });
  });

  // Add event listener for previous insurance radio buttons
  const yesPreviousInsurance = document.getElementById("yesPreviousInsurance");
  const noPreviousInsurance = document.getElementById("noPreviousInsurance");
  const previousInsuranceDetails = document.getElementById(
    "previousInsuranceDetails"
  );

  if (yesPreviousInsurance && noPreviousInsurance) {
    yesPreviousInsurance.addEventListener("change", function () {
      previousInsuranceDetails.style.display = "block";
    });

    noPreviousInsurance.addEventListener("change", function () {
      previousInsuranceDetails.style.display = "none";
    });
  }

  // Add this after the previous insurance event listeners
  const yesCancellation = document.getElementById("yesCancellation");
  const noCancellation = document.getElementById("noCancellation");
  const cancellationDetails = document.getElementById("cancellationDetails");

  if (yesCancellation && noCancellation) {
    yesCancellation.addEventListener("change", function () {
      cancellationDetails.style.display = "block";
    });

    noCancellation.addEventListener("change", function () {
      cancellationDetails.style.display = "none";
    });
  }

  // Update the formatWhatsAppMessage function to include all sections
  function formatWhatsAppMessage(data) {
    return `Health Statement Form Details:

PERSONAL INFORMATION:
Passport No: ${data.passportNo}
Name: ${data.firstName} ${data.lastName}
Date of Birth: ${data.dateOfBirth}
Sex: ${data.sex}

PHYSICAL DETAILS:
Height: ${data.height}cm
Weight: ${data.weight}kg

GENERAL QUESTIONS:
${formatGeneralQuestions(data)}

MEDICAL CONDITIONS:

1. Nervous System Conditions:
${formatConditions(data.conditions)}

2. Eye Conditions:
${formatConditions(data.eyeConditions)}
Other Eye Problems: ${
      data.otherEyeDisease === "yes" ? data.otherEyeDiseaseDetails : "No"
    }

3. Heart Conditions:
${formatConditions(data.heartConditions)}
Other Heart Problems: ${
      data.otherHeartDisease === "yes" ? data.otherHeartDiseaseDetails : "No"
    }

4. Blood Vessel Conditions:
${formatConditions(data.vesselConditions)}
Other Vascular Problems: ${
      data.otherVascularDisease === "yes"
        ? data.otherVascularDiseaseDetails
        : "No"
    }

5. Metabolic Diseases:
${formatConditions(data.metabolicConditions)}
Other Metabolic Problems: ${
      data.otherMetabolicDisease === "yes"
        ? data.otherMetabolicDiseaseDetails
        : "No"
    }

6. Respiratory System:
${formatConditions(data.respiratoryConditions)}
Other Respiratory Problems: ${
      data.otherRespiratoryDisease === "yes"
        ? data.otherRespiratoryDiseaseDetails
        : "No"
    }

7. Digestive System:
${formatConditions(data.digestiveConditions)}
Other Digestive Problems: ${
      data.otherDigestiveDisease === "yes"
        ? data.otherDigestiveDiseaseDetails
        : "No"
    }

8. Liver:
${formatConditions(data.liverConditions)}
Other Liver Problems: ${
      data.otherLiverDisease === "yes" ? data.otherLiverDiseaseDetails : "No"
    }

9. Hernia:
Location: ${data.herniaLocation || "None"}
Surgery: ${
      data.herniaSurgery === "yes"
        ? `Yes, Date: ${data.herniaSurgeryDate}`
        : "No"
    }
Problem Solved: ${data.herniaSolved === "yes" ? "Yes" : "No"}

10. Kidney and Urinary Tract:
${formatConditions(data.kidneyConditions)}
Other Kidney Problems: ${
      data.otherKidneyDisease === "yes" ? data.otherKidneyDiseaseDetails : "No"
    }

11. Joints and Bones:
${formatConditions(data.jointConditions)}
Other Joint Problems: ${
      data.otherJointDisease === "yes" ? data.otherJointDiseaseDetails : "No"
    }

12. Skin and Sex Diseases:
${formatConditions(data.skinConditions)}
Other Skin Problems: ${
      data.otherSkinDisease === "yes" ? data.otherSkinDiseaseDetails : "No"
    }

13. Malignant Tumors/Cancer:
${data.cancerDetails || "None reported"}

14. For Women:
${formatWomenConditions(data)}
Gynecological Problems: ${data.gynecologicalDetails || "None reported"}
Pregnant: ${data.pregnant ? "Yes" : "No"}
Cesarean Delivery: ${
      data.cesareanDelivery === "yes" ? `Yes, Date: ${data.cesareanDate}` : "No"
    }

15. For Men:
${formatMenConditions(data)}

16. Mental Illnesses:
${data.mentalIllnessDetails || "None reported"}

17. Nose, Ear and Throat:
${formatConditions(data.entConditions)}
Other ENT Problems: ${
      data.otherENTDisease === "yes" ? data.otherENTDiseaseDetails : "No"
    }

PREVIOUS INSURANCE:
${formatPreviousInsurance(data)}

POWER OF ATTORNEY:
Agent Name: ${data.agentName || "Not specified"}
Date: ${data.powerOfAttorneyDate || "Not specified"}
Name: ${data.powerOfAttorneyName || "Not specified"}

DECLARATION DETAILS:
Agreement to Use Information: ${data.agreementToUse === "yes" ? "Yes" : "No"}
Previous Insurance Cancellation: ${
      data.previousCancellation === "yes"
        ? `Yes - ${data.cancellationDetails}`
        : "No"
    }

SIGNATURES:
Declaration Date: ${data.declarationDate || "Not specified"}

Note: This form requires physical signatures from:
- Insurance Candidate
- Witness

This Health Statement Form has been completed with an understanding of its content in a language fluent to the candidate.`;
  }

  function formatGeneralQuestions(data) {
    return `Narcotics Use: ${data.narcotics ? "Yes" : "No"}
Alcohol Consumption: ${
      data.alcohol ? `Yes - ${data.alcoholQuantity} glasses per day` : "No"
    }
Medical Examinations (Last 10 years): ${data.question3 === "yes" ? "Yes" : "No"}
Details: ${data.examDetails || "N/A"}
Surgery/Transplantation: ${data.question4 === "yes" ? "Yes" : "No"}
Details: ${data.surgeryDetails || "N/A"}
Hospitalization: ${data.question5 === "yes" ? "Yes" : "No"}
Details: ${data.hospitalizationDetails || "N/A"}
Regular Medications: ${data.question6 === "yes" ? "Yes" : "No"}
Details: ${data.medicationDetails || "N/A"}
Allergies: ${data.question7 === "yes" ? "Yes" : "No"}
Details: ${data.allergyDetails || "N/A"}`;
  }

  function formatWomenConditions(data) {
    if (!data.womenConditions) return "Not applicable";
    let conditions = formatConditions(data.womenConditions);
    return `${conditions}
Pregnant: ${data.pregnant ? "Yes" : "No"}
Cesarean Delivery: ${
      data.cesareanDelivery === "yes" ? `Yes, Date: ${data.cesareanDate}` : "No"
    }`;
  }

  function formatMenConditions(data) {
    if (!data.menConditions) return "Not applicable";
    let conditions = formatConditions(data.menConditions);
    return `${conditions}
Other Problems: ${
      data.otherMenDisease === "yes" ? data.otherMenDiseaseDetails : "No"
    }`;
  }

  function formatPreviousInsurance(data) {
    if (data.previousInsurance === "no") return "No previous insurance";
    return `Previous Insurance: Yes
Company: ${data.insuranceCompany || "Not specified"}
Policy Number: ${data.policyNumber || "Not specified"}
Membership Number: ${data.membershipNumber || "Not specified"}
Period: From ${
      data.insuranceFrom || "Not specified"
    } To ${data.insuranceTo || "Not specified"}`;
  }

  function formatConditions(conditions) {
    if (!conditions) return "None reported";
    if (Array.isArray(conditions)) {
      if (conditions.length === 0) return "None reported";
      return conditions
        .map((condition) => `- ${formatConditionName(condition)}`)
        .join("\n");
    }
    return "None reported";
  }

  function formatConditionName(condition) {
    // Convert camelCase to readable text
    return condition
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between words
      .trim();
  }

  // Add this event listener after the form submit listener
  const whatsappBtn = document.getElementById("whatsappShare");
  whatsappBtn.addEventListener("click", function () {
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
      console.log(`${key}: ${value}`); // Debug log to check collected values
    });

    if (validateForm(formObject)) {
      const message = formatWhatsAppMessage(formObject);
      console.log("WhatsApp Message:", message); // Debug log to check final message
      const phoneNumber = "972543285967";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  });
});
