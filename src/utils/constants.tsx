import * as d3 from "d3";

export const expenseCategories = [
    "Housing",
    "Transportation",
    "Groceries",
    "Restaurants",
    "Utilities",
    "Insurance",
    "Health",
    "Entertainment",
    "Debt Repayment",
    "Other",
]

export const colorScale = d3.scaleOrdinal()
    .domain(Object.keys(expenseCategories))
    .range(d3.schemeCategory10);